
import { useState, useEffect } from 'react'
import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import ViewToggle from '../../components/Market/ViewToggle/ViewToggle'
import CoinTable from '../../components/Market/CoinTable/CoinTable'
import CoinGrid from '../../components/Market/CoinGrid/CoinGrid'

export default function MarketPage() {

    const [isReady, setIsReady] = useState(false)
    const [coinData, setCoinData] = useState([])

    useEffect(() => {
        async function getData() {
            const date = (new Date()).toString()
            const timeLastHour = Date.parse((date.substr(0, 18) + ':00:00' + date.substr(24))) / 1000

            const URL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=32&tsym=USD'
            const fetchedData = await fetch(URL).then(r => r.json())
            const data = fetchedData.Data.reduce((result, crypto, index) => {
                if ('RAW' in crypto) {
                    const coin = crypto.CoinInfo
                    const coinDIS = crypto.DISPLAY.USD
                    const coinRAW = crypto.RAW.USD
                    result.push({
                        rank: index + 1,
                        logo: `https://www.cryptocompare.com${coin.ImageUrl}`,
                        name: coin.FullName,
                        symbol: coin.Name,
                        price: coinDIS.PRICE.toLocaleString(
                            'en-GB', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                        }),
                        changepct: (Math.sign(coinRAW.CHANGEPCT24HOUR) == 1 ? '+' : '') + coinDIS.CHANGEPCT24HOUR,
                        updown: Math.random() > 0.5 ? '▲' : '▼',
                        open24: coinRAW.OPEN24HOUR,
                        totalvolume: coinDIS.TOTALTOPTIERVOLUME24HTO,
                        marketcap: coinDIS.MKTCAP,
                        chart: `https://images.cryptocompare.com/sparkchart/${coin.Name}/USD/latest.png?ts=${timeLastHour}`
                    })
                }
                return result
            }, [])

            setCoinData(data)
            getLiveData(data)
        }

        let client = null // If it declared outside it doesnt work
        async function getLiveData(coins) {
            const previous = coins.map(coin => {
                return { price: coin.price }
            })

            const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
            client = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`)

            const subs = coins.map(coin => {
                return `5~CCCAGG~${coin.symbol}~USD`
            })

            client.onopen = () => {
                client.send(JSON.stringify({
                    "action": "SubAdd",
                    "subs": subs
                }))
            }

            client.onmessage = (message) => pushWebSocketData(JSON.parse(message.data))

            function pushWebSocketData(data) {
                if ('PRICE' in data) {
                    const sym = coins.findIndex(((obj) => obj.symbol == data.FROMSYMBOL))
                    coins[sym].price = '$ ' + (data.PRICE.toLocaleString(
                        'en-GB', {
                        scss: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                    }))
                    coins[sym].changepct = (Math.sign(coins[sym].changepct) == 1 ? '+' : '') +
                        (((data.PRICE - coins[sym].open24) / data.PRICE) * 100).toFixed(2)

                    if (coins[sym].price > previous[sym].price) {
                        previous[sym].price = coins[sym].price
                        coins[sym].updown = '▲'
                    } else if (coins[sym].price < previous) {
                        previous[sym].price = coins[sym].price
                        coins[sym].updown = '▼'
                    }

                    // THIS POSSIBLY NEEDS OPTIMIZATION
                    setCoinData([...coins])
                }
            }
            setIsReady(true)
        }

        getData()

        return () => {
            client.close()
        }

    }, [])

    const [viewMode, setViewMode] = useState('grid')

    const handleViewMode = (event, mode) => {
        if (mode !== null) setViewMode(mode)
    }

    return (
        <LoadingScreen ready={isReady}>
            <h2>Market Live data</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
            {viewMode == 'grid' ? <CoinGrid coins={coinData} /> : <CoinTable coins={coinData} />}
        </LoadingScreen>)
}