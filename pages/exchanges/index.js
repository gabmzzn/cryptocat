/* eslint-disable @next/next/no-img-element */
import ExchangesTable from "../../components/Exhanges/Table/ExhangesTable"
import { useState, useEffect } from "react"

export default function Exchanges(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [exchangeData, setExchangeData] = useState([])

    useEffect(() => {
        async function getData() {

            const URL = 'https://min-api.cryptocompare.com/data/top/exchanges?fsym=BTC&tsym=USD&limit=30'
            const fetchedData = await fetch(URL).then(r => r.json())
            const data = fetchedData.Data.map((exchange, index) => {
                return exchange
            })

            setExchangeData(data)
            setIsLoading(false)
        }
        getData()
    }, [])

    if (!isLoading) {
        return <ExchangesTable data={exchangeData} />
    }

}