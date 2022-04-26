import CoinChart from "./content/CoinChart"
import CoinDescription from "./content/CoinDescription"
import CoinSidebar from "./content/CoinSidebar"
import CoinTitle from "./content/CoinTitle"
import style from './CoinDetails.module.css'
import NewsCard from "./NewsFeed/NewsCard"

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
        {news.Data.slice(0, 10).map(n => {
            return <NewsCard key={n.id} data={n} />
        })}
    </div>
}