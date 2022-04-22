import CoinChart from "./content/CoinChart"
import CoinDescription from "./content/CoinDescription"
import CoinSidebar from "./content/CoinSidebar"
import style from './CoinDetails.module.css'

export default function CoinDetails(props) {

    const historicalData = props.historicalData
    const coinInfo = props.coinInfo

    return <div className={style.container}>
        <div className={style.leftContainer}>
            <CoinChart data={historicalData} />
            <CoinDescription data={coinInfo} />
        </div>
        <div className={style.rightContainer}>
            <CoinSidebar data={coinInfo} />
        </div>
    </div>

}