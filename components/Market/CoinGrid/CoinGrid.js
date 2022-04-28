import Card from './Card/Card'
import css from './CoinGrid.module.css'

export default function CoinGrid(props) {
    const coins = props.data
    return (
        <div className={css.cards}>
            {coins.map((coin, i) => {
                return <Card key={coin.rank} data={coins[i]} />
            })}
        </div>
    )
}
