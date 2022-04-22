import CoinChart from "./content/CoinChart"
import CoinDescription from "./content/CoinDescription"
import CoinSidebar from "./content/CoinSidebar"
import style from './CoinDetails.module.css'
import { useEffect, useState } from "react"

export default function CoinDetails(props) {

    const [chartData, setChartData] = useState([])
    const [descriptionData, setdescriptionData] = useState([])
    const [sidebarData, setsidebarData] = useState([])

    useEffect(() => {
        async function getChartData() {
            const URL = 'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&toTs=1650550414&limit=999'
            const json = await fetch(URL).then(res => res.json())
            const data = json.Data.Data
                .map(r => Object.values({ time: r.time * 1000, close: r.close }))
            setChartData(data)
        }
        getChartData()
    }, [])

    useEffect(() => {

    }, [])

    return <div className={style.container}>
        <div className={style.leftContainer}>
            <CoinChart data={chartData} />
            <CoinDescription data={descriptionData} />
        </div>
        <div className={style.rightContainer}>
            <CoinSidebar data={sidebarData} />
        </div>
    </div>

}