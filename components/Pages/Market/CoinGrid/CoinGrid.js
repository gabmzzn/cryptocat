import Card from './Card/Card'
import scss from './CoinGrid.module.scss'

export default function CoinGrid(props) {

    const { coins } = props

    return (
        <div className={scss.cards}>
            {coins.map(coin => <Card key={coin.rank} coin={coin} />)}
        </div>
    )
}
