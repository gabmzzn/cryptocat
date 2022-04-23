import MarketTable from "../../components/Market/MarketTable"
import { useState, useEffect } from 'react'

export default function Market() {

    const [data, setData] = useState(false)

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
                        sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
                    })
                i++
            }
            setData(composedData)
        }
        getData()
    }, [])

    if (data) {
        console.log(data)
        return (
            <MarketTable data={data} />
        )
    }
    return (
        <h1>Loading data...</h1>
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