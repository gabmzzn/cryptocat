import CoinInfo from "../../components/Pages/CoinInfo/CoinInfo"
import { useRouter } from 'next/router'
import LoadingScreen from "../../components/Layout/LoadingScreen/LoadingScreen"
import { useEffect, useState } from "react"

export default function CoinsDetail() {

  const [isReady, setIsReady] = useState(0)
  const [historicalData, setHistoricalData] = useState(false)
  const [coinInfo, setCoinInfo] = useState(false)
  const [newsFeed, setNewsFeed] = useState(false)

  const router = useRouter()

  const histoTime = 999

  // Social data
  // https://min-api.cryptocompare.com/data/social/coin/latest?coinId=7605

  useEffect(() => {
    if (router.isReady) {
      const COIN = router.query.coins.toLocaleUpperCase()
      async function getHistoricalData() {
        const URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${COIN}&tsym=USD&toTs=${Date.parse(new Date()) / 1000}&limit=${histoTime}`
        const json = await fetch(URL).then(res => res.json())
        setHistoricalData(json.Data.Data)
        setIsReady(load => load + 1)
        getCoinInfo()
      }

      async function getCoinInfo() {
        const coinsURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${COIN}`
        const coinList = await fetch(coinsURL).then(res => res.json())
        const priceURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${COIN}&tsyms=USD`
        const price = await fetch(priceURL).then(res => res.json())
        const coin = coinList.Data[COIN]
        const changePct = price.DISPLAY[COIN].USD.CHANGEPCT24HOUR
        const data = {
          price: price.DISPLAY[COIN].USD.PRICE,
          symbol: coin.Symbol,
          name: coin.CoinName,
          description: coin.Description,
          high24: price.DISPLAY[COIN].USD.HIGH24HOUR,
          low24: price.DISPLAY[COIN].USD.LOW24HOUR,
          priceChange: price.DISPLAY[COIN].USD.CHANGE24HOUR,
          changePct: (changePct > 0 ? '+' : '') + changePct,
          sortOrder: coin.SortOrder,
          rating: coin.Rating.Weiss.Rating,
          technologyAdoptionRating: coin.Rating.Weiss.TechnologyAdoptionRating,
          marketPerformanceRating: coin.Rating.Weiss.MarketPerformanceRating,
          totalCoinsMined: coin.TotalCoinsMined ? coin.TotalCoinsMined.toFixed(0) : 'N/A',
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