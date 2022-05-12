import { useState, useEffect } from 'react'
import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import Market from '../../components/Pages/Market/Market'

export default function MarketPage() {

  const [isReady, setIsReady] = useState(false)
  const [coinData, setCoinData] = useState([])

  function parsePrice(n) {
    return n.toLocaleString('en-GB',
      { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5, })
  }

  // All coins
  // https://min-api.cryptocompare.com/data/all/coinlist?summary=true

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
            price: parsePrice(coinDIS.PRICE),
            changepct: (coinRAW.CHANGEPCT24HOUR > 0 ? '+' : '') + coinRAW.CHANGEPCT24HOUR.toFixed(2),
            updown: Math.random() > 0.5 ? '▲' : '▼',
            open24: coinRAW.OPEN24HOUR,
            totalvolume: coinDIS.TOTALTOPTIERVOLUME24HTO,
            marketcap: coinDIS.MKTCAP,
            chart: `https://images.cryptocompare.com/sparkchart/${coin.Name}/USD/latest.png?ts=${timeLastHour}`
          })
        }
        setIsReady(true)
        return result
      }, [])

      setCoinData(data)
      getLiveData(data)
    }

    let client = null // If its declared inside it doesnt work

    async function getLiveData(coins) {

      const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
      client = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`)

      const subs = coins.map(coin => `5~CCCAGG~${coin.symbol}~USD`)

      client.onopen = () => {
        client.send(JSON.stringify({
          "action": "SubAdd",
          "subs": subs
        }))
      }

      client.onmessage = (message) => pushWebSocketData(JSON.parse(message.data))

      const previous = coins.map(coin => { return { price: coin.price } })
      function pushWebSocketData(data) {
        if ('PRICE' in data) {
          const { PRICE, OPEN24HOUR, FROMSYMBOL } = data
          const sym = coins.findIndex(coin => coin.symbol == FROMSYMBOL)
          if (OPEN24HOUR) coins[sym].open24 = OPEN24HOUR
          coins[sym].price = '$ ' + parsePrice(PRICE)
          coins[sym].updown = coins[sym].price > previous[sym].price ? '▲' : '▼'
          previous[sym].price = coins[sym].price

          if (PRICE >= coins[sym].open24) {
            coins[sym].changepct = '+' + ((((PRICE - coins[sym].open24) / coins[sym].open24) * 100).toFixed(2))
          }
          else {
            coins[sym].changepct = '-' + (((coins[sym].open24 - PRICE) / coins[sym].open24) * 100).toFixed(2)
          }

          setCoinData([...coins])
        }
      }
    }

    getData()

    return () => {
      client.close()
    }

  }, [])

  if (isReady) return <Market coins={coinData} />

  return <LoadingScreen />
}