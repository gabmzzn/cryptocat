import CoinChart from "./CoinChart"
import CoinDescription from "./CoinDescription"
import CoinSidebarInfo from "./CoinSidebarInfo"
import style from './index.module.css'

export default function CoinDetails(props) {
    return <div className={style.container}>
        <div className={style.leftContainer}>
            <CoinChart />
            <CoinDescription />
        </div>
        <div className={style.rightContainer}>
            <CoinSidebarInfo />
        </div>
    </div>

}