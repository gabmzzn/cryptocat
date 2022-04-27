import CoinDetails from "./CoinDetails/CoinDetails"
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen'
import { useEffect, useState } from "react"
import { CSSTransition } from 'react-transition-group'


export default function CoinInfo(props) {

    const [isLoading, setIsLoading] = useState(0)
    const [historicalData, setHistoricalData] = useState(false)
    const [coinInfo, setCoinInfo] = useState(false)
    const [newsFeed, setNewsFeed] = useState(false)

    const selCoin = props.coin.toUpperCase()
    const histoTime = 999

    useEffect(() => {
        let histoData = []
        async function getHistoricalData() {
            const URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selCoin}&tsym=USD&toTs=${Date.parse(new Date()) / 1000}&limit=${histoTime}`
            const json = await fetch(URL).then(res => res.json())
            histoData = json.Data.Data
            setHistoricalData(histoData)
            getCoinInfo()
            setIsLoading(load => load + 1)
        }

        async function getCoinInfo() {
            const coinsURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${selCoin}`
            const coinList = await fetch(coinsURL).then(res => res.json())
            const priceURL = `https://min-api.cryptocompare.com/data/price?fsym=${selCoin}&tsyms=USD`
            const singlePrice = await fetch(priceURL).then(res => res.json())

            const coin = coinList.Data[selCoin]
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
                totalCoinsMined: coin.TotalCoinsMined.toFixed(0),
                platformType: coin.PlatformType,
                algorithm: coin.Algorithm,
                assetWebsiteUrl: coin.AssetWebsiteUrl,
                imageURL: coin.ImageUrl,
            }
            setCoinInfo(data)
            setIsLoading(load => load + 1)
        }

        async function getNewsFeed() {
            const URL = `https://min-api.cryptocompare.com/data/v2/news/?&lang=EN&categories=${selCoin}&excludeCategories=Sponsored&lTs=${Date.parse(new Date()) / 1000}`
            const news = await fetch(URL).then(res => res.json())

            setNewsFeed(news)
            setIsLoading(load => load + 1)
        }

        getHistoricalData()
        getNewsFeed()
    }, [])

    if (isLoading > 2) {
        return <>
            <CoinDetails
                historicalData={historicalData}
                coin={coinInfo}
                news={newsFeed}
            />
        </>
    }

    return <LoadingScreen status={isLoading} />
}