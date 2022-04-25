
import { useState, useEffect } from 'react'
import LiveTable from "../../components/Market/Table/LiveTable"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import LoadingScreen from '../../components/layout/LoadingScreen/LoadingScreen'

export default function Market() {

    const [isLoading, setIsLoading] = useState(true)
    const [currencyData, setCurrencyData] = useState([])

    useEffect(() => {
        async function getData() {
            const composedData = []
            const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`
            const prices = Object.values(await fetch(URL).then(res => res.json()))
            // Last hour timestamp
            let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

            for (let [i, currency] of symbolList.entries()) {
                const sign = Math.sign(prices[0][currency].USD.CHANGEPCT24HOUR) == 1 ? '+' : ''
                composedData.push(
                    {
                        rank: i + 1,
                        logo: prices[1][currency].USD.IMAGEURL,
                        name: currenciesNames[i],
                        symbol: currency,
                        price: prices[1][currency].USD.PRICE.toLocaleString(
                            'en-GB', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                        }),
                        changepct: sign + prices[1][currency].USD.CHANGEPCT24HOUR,
                        updown: Math.random() > 0.5 ? '▲' : '▼',
                        open24: prices[0][currency].USD.OPEN24HOUR,
                        totalvolume: prices[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
                        marketcap: prices[1][currency].USD.MKTCAP,
                        chart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
                    })
                i++
            }
            setCurrencyData(composedData)
            getCurrencyData(composedData)
        }
        getData()

        // WebSocket Connection 
        const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
        const client = new W3CWebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`)

        async function getCurrencyData(currencyList) {
            // let performers = [...this.appService.currencyList].sort((a, b) => b.changepct - a.changepct)
            // performers.splice(3, 44)
            // this.performersSource = performers

            const subs = []
            currencyList.forEach(coin => {
                subs.push(`5~CCCAGG~${coin.symbol}~USD`)
            })
            client.onopen = () => {
                client.send(JSON.stringify({
                    "action": "SubAdd",
                    "subs": subs
                }))
            }
            let subibaja = []
            for (let i = 0; i < 50; i++) {
                subibaja.push({
                    price: currencyList[i].price
                })
            }
            client.onmessage = (message) => pushWebSocketData(JSON.parse(message.data))

            function pushWebSocketData(data) {
                if (data.PRICE !== undefined) {
                    const sym = currencyList.findIndex(((obj) => obj.symbol == data.FROMSYMBOL))
                    currencyList[sym].price = '$ ' + (data.PRICE.toLocaleString(
                        'en-GB', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                    }))
                    currencyList[sym].changepct = (currencyList[sym].changepct >= 0 ? '+' : '') +
                        (((data.PRICE - currencyList[sym].open24) / data.PRICE) * 100).toFixed(2)

                    if (currencyList[sym].price > subibaja[sym].price) {
                        subibaja[sym].price = currencyList[sym].price
                        currencyList[sym].updown = '▲'
                    } else if (currencyList[sym].price < subibaja) {
                        subibaja[sym].price = currencyList[sym].price
                        currencyList[sym].updown = '▼'
                    }
                    // let performers = [...currencyList].sort((a, b) => b.changepct - a.changepct)
                    // performers.splice(3, 44)
                    // performersSource = performers

                    // THIS POSSIBLY NEEDS OPTIMIZATION
                    setCurrencyData([...currencyList])
                }
            }
            setIsLoading(false)
        }

        return () => {
            client.close()
        }

    }, [])

    if (isLoading) return <LoadingScreen status={isLoading} />

    return (
        <LiveTable data={currencyData} />
    )
}

// export async function getStaticProps() {
//     const composedData = []
//     let plussign, updown = ''
//     Math.random() > 0.5 ? updown = '▲' : updown = '▼'
//     console.log('[API Data fetching]')
//     let prices = Object.values(await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`)).prices())
//     // Last hour timestamp
//     let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

//     for (let [i, currency] of symbolList.entries()) {
//         prices[0][currency].USD.CHANGEPCT24HOUR >= 0.00 ? plussign = '+' : plussign = ''
//         composedData.push(
//             {
//                 rank: i + 1,
//                 logo: prices[1][currency].USD.IMAGEURL,
//                 name: currenciesNames[i],
//                 symbol: currency,
//                 price: prices[1][currency].USD.PRICE.toLocaleString(
//                     'en-GB', {
//                     style: 'decimal',
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 5,
//                 }),
//                 changepct: plussign + prices[1][currency].USD.CHANGEPCT24HOUR,
//                 updown: updown,
//                 open24: prices[0][currency].USD.OPEN24HOUR,
//                 totalvolume: prices[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
//                 marketcap: prices[1][currency].USD.MKTCAP,
//                 sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
//             })
//         i++
//     }

//     return {
//         props: {
//             composedData
//         },
//         revalidate: 10,
//     }

// }

const symbolList = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
    'DOGE', 'LUNA', 'UNI', 'AVAX', 'LINK', 'ALGO', 'LTC', 'BCH',
    'WBTC', 'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET',
    'FTT', 'ETC', 'TRX', 'DAI', 'DASH', 'OXT', 'FTM', 'EGLD', 'XMR', 'CAKE',
    'EOS', 'STX', 'AAVE', 'SUSHI', 'NEAR', 'SNX', 'QNT', 'GRT', 'NEO',
    'WAVES', 'KSM', 'LEO', 'MKR', 'CHR', 'ONE', 'HNT', 'AMP']

const currenciesNames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano',
    'Solana', 'XRP', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche',
    'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin',
    'Polygon', 'Axie Infinity', 'Cosmos', 'Internet Computer', 'Filecoin',
    'Tezos', 'Stellar', 'VeChain', 'FTX Token', 'Ethereum Classic', 'TRON',
    'Dai', 'Dash', 'Orchid Protocol', 'Fantom', 'Elrond', 'Monero', 'PancakeSwap', 'EOS',
    'Stacks', 'Aave', 'SushiSwap', 'NEAR Protocol', 'Synthetix', 'Quant',
    'The Graph', 'Neo', 'Waves', 'Kusama', 'LEO Token', 'Maker',
    'Chroma', 'Harmony', 'Helium', 'Amp']