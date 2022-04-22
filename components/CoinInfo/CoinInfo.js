import CoinTitle from "./body/CoinTitle"
import CoinDetails from "./body/CoinDetails/CoinDetails"
import { useEffect, useState } from "react"

export default function CoinInfo(props) {

    const selCoin = props.coin.toUpperCase()
    const selCoinTC = 'USD'

    const [historicalData, setHistoricalData] = useState(false)
    const [coinInfo, setCoinInfo] = useState(false)

    useEffect(() => {
        let histoData = []
        async function getHistoricalData() {
            const URL = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selCoin}&tsym=${selCoinTC}&toTs=1650550414&limit=999`
            const json = await fetch(URL).then(res => res.json())
            histoData = json.Data.Data
                .map(r => Object.values({ time: r.time * 1000, close: r.close }))
            setHistoricalData(histoData)
            getCoinInfo()
        }
        getHistoricalData()

        async function getCoinInfo() {
            const coinList = `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${selCoin}`
            const json = await fetch(coinList).then(res => res.json())
            const singlePrice = `https://min-api.cryptocompare.com/data/price?fsym=${selCoin}&tsyms=${selCoinTC}`
            const json2 = await fetch(singlePrice).then(res => res.json())
            const coin = json.Data[selCoin]

            const price = json2[selCoinTC]
            const high24 = histoData[999][1]
            const low24 = histoData[999][1]
            const data = {
                price: price.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                symbol: coin.Symbol,
                name: coin.CoinName,
                description: coin.Description.replaceAll(/\. /g, '.<br><br>'),
                high24: high24.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                low24: low24.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                priceChange: (price - low24).toFixed(2),
                sortOrder: coin.SortOrder,
                rating: coin.Rating.Weiss.Rating,
                technologyAdoptionRating: coin.Rating.Weiss.TechnologyAdoptionRating,
                marketPerformanceRating: coin.Rating.Weiss.MarketPerformanceRating,
                // if (coin.TotalCoinsMined == undefined) { TotalCoinsMined = 18822199 } // This is because sometimes the API fails
                // else { TotalCoinsMined = (coin.TotalCoinsMined).toFixed(0) }
                platformType: coin.PlatformType,
                algorithm: coin.Algorithm,
                assetWebsiteUrl: coin.AssetWebsiteUrl,
                imageURL: coin.ImageUrl,
                // let i = currenciesTC.findIndex(((obj) => obj.name == selCoinTC)),
                // imageURLTC: currenciesTC[i].img,
                // if (rating == '') {
                //     rating = technologyAdoptionRating = marketPerformanceRating = 'N/A'
            }
            setCoinInfo(data)
        }
    }, [])

    if (coinInfo && historicalData) {
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
}