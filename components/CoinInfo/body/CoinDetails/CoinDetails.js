import CoinChart from "./content/CoinChart"
import CoinDescription from "./content/CoinDescription"
import CoinSidebar from "./content/CoinSidebar"
import CoinTitle from "./content/CoinTitle"
import style from './CoinDetails.module.css'

export default function CoinDetails(props) {

    const { coinInfo, historicalData } = props

    return <div style={{ margin: '0 30px' }}>
        <CoinTitle
            name={coinInfo.name}
            symbol={coinInfo.symbol}
            logo={coinInfo.imageURL}
        />
        <div className={style.container}>
            <div className={style.leftContainer}>
                <CoinChart
                    name={coinInfo.name}
                    data={historicalData}
                />
                <CoinDescription
                    name={coinInfo.name}
                    symbol={coinInfo.symbol}
                    description={coinInfo.description}
                />
            </div>
            <div className={style.rightContainer}>
                <CoinSidebar data={coinInfo} />
            </div>
        </div>
    </div>
}