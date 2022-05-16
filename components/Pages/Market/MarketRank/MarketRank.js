import scss from './MarketRank.module.scss'
import CardRank from './CardRank/CardRank'

export default function MarketRank(props) {

	const { body } = scss
	const { coins } = props

	// Top Gainers of the day	
	const gainers24h = [...coins].sort((a, b) => b.changepct - a.changepct).slice(0, 3)
	// Top Losers of the day
	const losers24h = [...coins].sort((a, b) => a.changepct - b.changepct).slice(0, 3)
	// Top Gainers of last hour
	const gainers1h = [...coins].sort((a, b) => b.changepcthour - a.changepcthour).slice(0, 3)
	// Top Losers of last hours
	const losers1h = [...coins].sort((a, b) => a.changepcthour - b.changepcthour).slice(0, 3)

	return (
		<div className={body}>
			<CardRank coins={gainers24h} type={'Top gainers last day'} />
			<CardRank coins={losers24h} type={'Top losers last day'} />
			<CardRank coins={gainers1h} type={'Top gainers last hour'} />
			<CardRank coins={losers1h} type={'Top losers last hour'} />
		</div>
	)

}