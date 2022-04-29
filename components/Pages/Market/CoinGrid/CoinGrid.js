import Card from './Card/Card'
import scss from './CoinGrid.module.scss'

export default function CoinGrid(props) {

    const { coins } = props

    return (
        <div className={scss.cards}>
            {coins.map((coin, i) => {
                return <Card key={coin.rank} coin={coins[i]} />
            })}
        </div>
    )
}
