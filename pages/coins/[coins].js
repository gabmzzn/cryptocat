import CoinInfo from "../../components/Pages/CoinInfo/CoinInfo"
import { useRouter } from 'next/router'
import LoadingScreen from "../../components/Layout/LoadingScreen/LoadingScreen"
import { useEffect, useState } from "react"

export default function CoinsPage() {

  const [isReady, setIsReady] = useState(0)
  const [historicalData, setHistoricalData] = useState(false)
  const [coinInfo, setCoinInfo] = useState(false)
  const [newsFeed, setNewsFeed] = useState(false)

  const router = useRouter()

  const histoTime = 999

  useEffect(() => {
    if (router.isReady) {
      const selected = router.query.coins.toLocaleUpperCase()
      let histoData = []
      async function getHistoricalData() {
        const URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selected}&tsym=USD&toTs=${Date.parse(new Date()) / 1000}&limit=${histoTime}`
        const json = await fetch(URL).then(res => res.json())
        histoData = json.Data.Data
        setHistoricalData(histoData)
        getCoinInfo()
        setIsReady(load => load + 1)
      }

      async function getCoinInfo() {
        const coinsURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${selected}`
        const coinList = await fetch(coinsURL).then(res => res.json())
        const priceURL = `https://min-api.cryptocompare.com/data/price?fsym=${selected}&tsyms=USD`
        const singlePrice = await fetch(priceURL).then(res => res.json())

        const coin = coinList.Data[selected]
        const data = {
          price: singlePrice['USD'].toLocaleString(
            'en-GB', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }),
          symbol: coin.Symbol,
          name: coin.CoinName,
          description: coin.Description,
          high24: histoData[histoTime].high.toLocaleString(
            'en-GB', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }),
          low24: histoData[histoTime].low.toLocaleString(
            'en-GB', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }),
          priceChange: (singlePrice['USD'] - histoData[histoTime].low).toFixed(2),
          sortOrder: coin.SortOrder,
          rating: coin.Rating.Weiss.Rating,
          technologyAdoptionRating: coin.Rating.Weiss.TechnologyAdoptionRating,
          marketPerformanceRating: coin.Rating.Weiss.MarketPerformanceRating,
          totalCoinsMined: 'TotalCoinsMined' in coin ? coin.TotalCoinsMined.toFixed(0) : 'N/A',
          platformType: coin.PlatformType,
          algorithm: coin.Algorithm,
          assetWebsiteUrl: coin.AssetWebsiteUrl,
          imageURL: coin.ImageUrl,
        }
        setCoinInfo(data)
        setIsReady(load => load + 1)
      }

      async function getNewsFeed() {
        const URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
        const news = await fetch(URL).then(res => res.json())
        setNewsFeed(news.Data)
        setIsReady(load => load + 1)
      }

      getHistoricalData()
      getNewsFeed()
    }
  }, [router])

  if (isReady == 3) return (
    <CoinInfo
      historicalData={historicalData}
      coin={coinInfo}
      news={newsFeed}
    />)

  return <LoadingScreen />
}