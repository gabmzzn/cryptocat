import Exchanges from "../../components/Pages/Exchanges/Exchanges"
import { useState, useEffect } from "react"
import LoadingScreen from "../../components/Layout/LoadingScreen/LoadingScreen"

export default function ExchangesPage() {
    console.log('exchanges')
    const [isReady, setIsReady] = useState(false)
    const [exchangeData, setExchangeData] = useState([])

    useEffect(() => {
        async function getData() {
            const URL = 'https://api.coingecko.com/api/v3/exchanges?per_page=30'
            const fetchedData = await fetch(URL).then(r => r.json())
            setExchangeData(fetchedData)
            setIsReady(true)
        }
        getData()
    }, [])

    return (
        <LoadingScreen ready={isReady}>
            <Exchanges exchanges={exchangeData} />
        </LoadingScreen>
    )
}