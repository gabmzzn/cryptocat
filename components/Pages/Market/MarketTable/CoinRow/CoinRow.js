import scss from './CoinRow.module.scss'
import Link from 'next/link'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useState, useEffect } from 'react'

export default function CoinRow(props) {

	const { coin } = props

	const { name, initialPrice, higherPrice1, higherPrice2, lowerPrice1, lowerPrice2, higherPct, lowerPct, hideable, arrow, display } = scss

	const [priceStyle, setPriceStyle] = useState(initialPrice)
	const [coinPrice, setCoinPrice] = useState(null)

	useEffect(() => {
		if (coinPrice !== null) {
			if (coin.price > coinPrice) {
				priceStyle == higherPrice1 ? setPriceStyle(higherPrice2) : setPriceStyle(higherPrice1)
			}
			else {
				priceStyle == lowerPrice1 ? setPriceStyle(lowerPrice2) : setPriceStyle(lowerPrice1)
			}
		}
		setCoinPrice(coin.price)
	}, [coin.price])

	function parsePrice(n) {
		return n.toLocaleString('en-GB',
			{ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5, })
	}

	return (
		<Link href={`/coins/${coin.symbol.toLowerCase()}`} key={coin.rank} passHref>
			<TableRow >
				<TableCell align="center" className={hideable}>{coin.rank}</TableCell>
				<TableCell align="left">
					<div className={name}>
						<img src={coin.logo} width={40} height={40} alt={coin.name} />
						{coin.symbol}&nbsp;&nbsp;<span>{coin.name}</span>
					</div>
				</TableCell>
				<TableCell align="right" width={150}
					id={coin.rank}>
					<div className={priceStyle}>
						<span className={arrow}>{coin.updown}</span>
						<span>$ {parsePrice(coin.price)}</span>
					</div>
				</TableCell>
				<TableCell align="center" className={coin.changepct > 0 ? higherPct : lowerPct}><span>{coin.changepct}%</span></TableCell>
				<TableCell align="center" className={hideable}>{coin.totalvolume}</TableCell>
				<TableCell align="center" className={hideable}>{coin.marketcap}</TableCell>
				<TableCell align="center" className={hideable}>
					<img src={coin.chart} width={150} height={35} alt={coin.name} />
				</TableCell>
			</TableRow>
		</Link>
	)
}