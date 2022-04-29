/* eslint-disable @next/next/no-img-element */
import ExchangesTable from "../../components/Exhanges/Table/ExhangesTable"
import { useState, useEffect } from "react"
import LoadingScreen from "../../components/Layout/LoadingScreen/LoadingScreen"

export default function ExchangesPage() {

    const [isReady, setIsReady] = useState(false)
    const [exchangeData, setExchangeData] = useState([])

    useEffect(() => {
        async function getData() {
            const URL = 'https://min-api.cryptocompare.com/data/top/exchanges?fsym=BTC&tsym=USD&limit=30'
            const fetchedData = await fetch(URL).then(r => r.json())
            const data = fetchedData.Data.map((exchange, index) => {
                return exchange
            })
            setExchangeData(data)
            setIsReady(true)
        }
        getData()
    }, [])


    return (
        <LoadingScreen ready={isReady}>
            <ExchangesTable exchanges={exchangeData} />
        </LoadingScreen>)


}