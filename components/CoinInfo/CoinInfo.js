import CoinTitle from "./body/CoinTitle"
import CoinDetails from "./body/CoinDetails/CoinDetails"
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen'
import { useEffect, useState } from "react"

export default function CoinInfo(props) {

    const [isLoading, setIsLoading] = useState(true)

    const selCoin = props.coin.toUpperCase()
    const selCoinTC = 'USD'

    const [historicalData, setHistoricalData] = useState(false)
    const [coinInfo, setCoinInfo] = useState(false)

    useEffect(() => {
        let histoData = []
        async function getHistoricalData() {
            const URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selCoin}&tsym=${selCoinTC}&toTs=${Date.parse(new Date()) / 1000}&limit=999`
            const json = await fetch(URL).then(res => res.json())
            histoData = json.Data.Data
            setHistoricalData(histoData)
            getCoinInfo()
        }
        getHistoricalData()

        async function getCoinInfo() {
            const coinsURL = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${selCoin}`
            const coinList = await fetch(coinsURL).then(res => res.json())
            const priceURL = `https://min-api.cryptocompare.com/data/price?fsym=${selCoin}&tsyms=${selCoinTC}`
            const singlePrice = await fetch(priceURL).then(res => res.json())

            const coin = coinList.Data[selCoin]
            const data = {
                price: singlePrice[selCoinTC].toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                symbol: coin.Symbol,
                name: coin.CoinName,
                description: coin.Description.replaceAll(/\. /g, '.<br><br>'),
                high24: histoData[999].high.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                low24: histoData[999].low.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                priceChange: (singlePrice[selCoinTC] - histoData[999].low).toFixed(2),
                sortOrder: coin.SortOrder,
                rating: coin.Rating.Weiss.Rating,
                technologyAdoptionRating: coin.Rating.Weiss.TechnologyAdoptionRating,
                marketPerformanceRating: coin.Rating.Weiss.MarketPerformanceRating,
                totalCoinsMined: (coin.TotalCoinsMined).toFixed(0),
                platformType: coin.PlatformType,
                algorithm: coin.Algorithm,
                assetWebsiteUrl: coin.AssetWebsiteUrl,
                imageURL: coin.ImageUrl,
            }
            setCoinInfo(data)
            setIsLoading(false)
        }
    }, [])

    if (isLoading) return <LoadingScreen />

    return <>
        <CoinTitle
            name={coinInfo.name}
            symbol={coinInfo.symbol}
            logo={coinInfo.imageURL}
        />
        <CoinDetails
            historicalData={historicalData}
            coinInfo={coinInfo}
        />
    </>

}