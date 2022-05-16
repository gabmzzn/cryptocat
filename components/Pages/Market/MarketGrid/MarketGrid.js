import Card from './Card/Card'
import scss from './MarketGrid.module.scss'

export default function MarketGrid(props) {

	const { coins } = props

	return (
		<div className={scss.cards}>
			{coins.map(coin => <Card key={coin.rank} coin={coin} />)}
		</div>
	)
}
