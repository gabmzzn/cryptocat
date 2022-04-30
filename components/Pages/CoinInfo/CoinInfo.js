import scss from './CoinInfo.module.scss'
import CoinChart from "./CoinChart/CoinChart"
import CoinDescription from "./CoinDescription/CoinDescription"
import CoinSidebar from "./CoinSidebar/CoinSidebar"
import CoinTitle from "./CoinTitle/CoinTitle"
import CoinNewsCard from "./CoinNews/CoinNewsCard"

export default function CoinDetails(props) {

    const { coin, historicalData, news } = props

    return <div scss={{ margin: '0 30px' }}>
        <CoinTitle
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.imageURL}
        />
        <div className={scss.container}>
            <div className={scss.leftContainer}>
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
            <div className={scss.rightContainer}>
                <CoinSidebar data={coin} />
            </div>
        </div>
        {/* <div className={scss.newsFeed}>
            {news.slice(0, 10).map(n => {
                return <CoinNewsCard key={n.id} news={n} />
            })}
        </div> */}
    </div>
}