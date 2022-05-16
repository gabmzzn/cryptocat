import scss from './CardRank.module.scss'
import CoinRank from './CoinRank/CoinRank'

export default function CardRank(props) {

	const { card, title } = scss
	const { type, coins } = props

	return (<>
		<div className={card}>
			<div className={title}>
				<span>{type}</span>
			</div>
			{coins.map(c => <CoinRank coin={c} />)}
		</div>
	</>)
}