
import { useState, useEffect } from 'react'
import LiveTable from "../../components/Market/Table/LiveTable"
import LoadingScreen from '../../components/layout/LoadingScreen/LoadingScreen'
import Card from '../../components/Market/Card/Card'
import style from './market.module.css'

export default function Market() {

    const [isLoading, setIsLoading] = useState(true)
    const [currencyData, setCurrencyData] = useState([])

    useEffect(() => {
        async function getData() {
            const date = (new Date()).toString()
            const timeLastHour = Date.parse((date.substr(0, 18) + ':00:00' + date.substr(24))) / 1000

            const URL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD'
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
            }, []).slice(0, 50)

            setCurrencyData(data)
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
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                    }))
                    coins[sym].changepct = (coins[sym].changepct >= 0 ? '+' : '') +
                        (((data.PRICE - coins[sym].open24) / data.PRICE) * 100).toFixed(2)

                    if (coins[sym].price > previous[sym].price) {
                        previous[sym].price = coins[sym].price
                        coins[sym].updown = '▲'
                    } else if (coins[sym].price < previous) {
                        previous[sym].price = coins[sym].price
                        coins[sym].updown = '▼'
                    }

                    // THIS POSSIBLY NEEDS OPTIMIZATION
                    setCurrencyData([...coins])
                }
            }
            setIsLoading(false)
        }

        getData()

        return () => {
            client.close()
        }

    }, [])

    if (isLoading) return <LoadingScreen status={isLoading} />

    return (<>
        <div className={style.cards}>
            {currencyData.map((coin, i) => {
                console.log('asd')
                return (<Card key={coin.rank} data={currencyData[i]} />)
            })}
        </div>
        {/* <LiveTable data={currencyData} /> */}
    </>)
}