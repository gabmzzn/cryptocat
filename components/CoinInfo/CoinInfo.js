import CoinChart from "./CoinChart/CoinChart"
import CoinDescription from "./CoinDescription/CoinDescription"
import CoinSidebar from "./CoinSidebar/CoinSidebar"
import CoinTitle from "./CoinTitle/CoinTitle"
import css from './CoinInfo.module.css'
import CoinNewsCard from "./CoinNews/CoinNewsCard"

export default function CoinDetails(props) {
    const { coin, historicalData, news } = props

    return <div css={{ margin: '0 30px' }}>
        <CoinTitle
            name={coin.name}
            symbol={coin.symbol}
            logo={coin.imageURL}
        />
        <div className={css.container}>
            <div className={css.leftContainer}>
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
            <div className={css.rightContainer}>
                <CoinSidebar data={coin} />
            </div>
        </div>
        <div className={css.newsFeed}>
            {news.Data.slice(0, 10).map(n => {
                return <CoinNewsCard key={n.id} data={n} />
            })}
        </div>
    </div>
}