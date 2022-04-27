import CoinChart from "./CoinChart/CoinChart"
import CoinDescription from "./CoinDescription/CoinDescription"
import CoinSidebar from "./CoinSidebar/CoinSidebar"
import CoinTitle from "./CoinTitle/CoinTitle"
import style from './CoinDetails.module.css'
import CoinNewsCard from "./CoinNews/CoinNewsCard"

export default function CoinDetails(props) {
    const { coin, historicalData, news } = props

    return <div style={{ margin: '0 30px' }}>
        <CoinTitle
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.imageURL}
        />
        <div className={style.container}>
            <div className={style.leftContainer}>
                <CoinChart
                    name={coin.name}
                    data={historicalData}
                />
                <CoinDescription
                    name={coin.name}
                    symbol={coin.symbol}
                    description={coin.description}
                />
            </div>
            <div className={style.rightContainer}>
                <CoinSidebar data={coin} />
            </div>
        </div>
        <div className={style.newsFeed}>
            {news.Data.slice(0, 10).map(n => {
                return <CoinNewsCard key={n.id} data={n} />
            })}
        </div>
    </div>
}