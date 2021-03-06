import CoinInfo from "../../components/Pages/CoinInfo/CoinInfo"
import { useRouter } from 'next/router'
import LoadingScreen from "../../components/Layout/LoadingScreen/LoadingScreen"
import { useEffect, useState } from "react"
import { CollectionsBookmarkSharp } from "@mui/icons-material"

export default function CoinsDetail(props) {


	const [isReady, setIsReady] = useState(0)
	const [historicalData, setHistoricalData] = useState(false)
	const [coinInfo, setCoinInfo] = useState(false)
	const [news, setNews] = useState(false)
	const [topNews, setTopNews] = useState(false)

	const router = useRouter()

	const histoTime = 999

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
					price: '$ ' + price.RAW[COIN].USD.PRICE.toLocaleString('en-GB',
						{ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5, }),
					symbol: coin.Symbol,
					name: coin.CoinName,
					description: coin.Description,
					high24: price.DISPLAY[COIN].USD.HIGH24HOUR,
					low24: price.DISPLAY[COIN].USD.LOW24HOUR,
					open24: price.RAW[COIN].USD.OPEN24HOUR,
					priceChange: price.DISPLAY[COIN].USD.CHANGE24HOUR,
					changePct: (changePct > 0 ? '+' : '') + changePct,
					sortOrder: coin.SortOrder,
					rating: coin.Rating.Weiss.Rating || 'N/A',
					technologyAdoptionRating: coin.Rating.Weiss.TechnologyAdoptionRating || 'N/A',
					marketPerformanceRating: coin.Rating.Weiss.MarketPerformanceRating || 'N/A',
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
				const topNews = await fetch(`/api/news/${COIN}=0=3`).then(r => r.json())
				setTopNews(topNews)
				setIsReady(load => load + 1)
				const news = await fetch(`/api/news/${COIN}=3=9`).then(r => r.json())
				setNews(news)
			}

			getHistoricalData()
			// getNewsFeed()
		}
	}, [router])

	if (isReady == 2) return (
		<CoinInfo
			historicalData={historicalData}
			coin={coinInfo}
		// topNews={topNews}
		// news={news}
		/>)

	return <LoadingScreen />
}