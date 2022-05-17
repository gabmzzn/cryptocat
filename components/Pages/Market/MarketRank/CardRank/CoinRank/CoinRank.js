import scss from './CoinRank.module.scss'
import Link from 'next/link'

export default function CoinRank(props) {

	const { name, symbol, logo, changepct } = props.coin
	const { coin, fullname, higherPct, lowerPct } = scss

	return (
		<Link href={`/coins/${symbol.toLowerCase()}`} passHref>
			<div className={coin}>
				<div className={fullname}>
					<img src={logo} width={40} height={40} alt={name} />
					<span>{symbol}</span>
				</div>
				<div align="center" className={changepct > 0 ? higherPct : lowerPct}><span>{changepct}%</span></div>
			</div>
		</Link>)
}