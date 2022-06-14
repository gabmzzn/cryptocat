import scss from './CoinRow.module.scss'
import Link from 'next/link'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { memo } from 'react'

function parsePrice(n) {
	return n.toLocaleString('en-GB',
		{ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5, })
}

function CoinRow(props) {

	console.log('%cCoinRow Rendered', 'background: orange; color: black; padding: 1px 8px; border-radius: 12px;')
	const { onFavChange } = props
	const { name, price, changepct, rank, symbol, logo, updown, totalvolume, marketcap, chart } = props.coin

	const { fullname, coinname, initialPrice, higherPrice1, higherPrice2, lowerPrice1, lowerPrice2, higherPct, lowerPct, hideable, arrow, display, favorite } = scss

	const [priceStyle, setPriceStyle] = useState(initialPrice)
	const [coinPrice, setCoinPrice] = useState(null)

	const [fav, setFav] = useState(props.fav)

	function handleFav() {
		setFav(fav => !fav)
		onFavChange(symbol)
	}

	useEffect(() => {
		if (coinPrice !== null) {
			if (price > coinPrice) {
				priceStyle == higherPrice1 ? setPriceStyle(higherPrice2) : setPriceStyle(higherPrice1)
			}
			else {
				priceStyle == lowerPrice1 ? setPriceStyle(lowerPrice2) : setPriceStyle(lowerPrice1)
			}
		}
		setCoinPrice(price)
	}, [price])

	return (
		<TableRow >
			<TableCell align="center">
				<div className={favorite} onClick={handleFav}>
					{fav ? <FavoriteIcon sx={{ color: 'red' }} fontSize='small' /> : <FavoriteBorderIcon fontSize='small' />}
				</div>
			</TableCell>
			<TableCell align="center" className={hideable}>{rank}</TableCell>
			<TableCell align="left">
				<div className={fullname}>
					<Link href={`/coins/${symbol.toLowerCase()}`} passHref>
						<a style={{ cursor: 'pointer' }} rel="noopener noreferrer">
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<img src={logo} width={40} height={40} alt={name} />
								{symbol}&nbsp;&nbsp;<span className={coinname}>{name}</span>
							</div>
						</a>
					</Link>
				</div>
			</TableCell>
			<TableCell align="right" width={150}
				id={rank}>
				<div className={priceStyle}>
					<span className={arrow}>{updown}</span>
					<span>$ {parsePrice(price)}</span>
				</div>
			</TableCell>
			<TableCell align="center" className={changepct > 0 ? higherPct : lowerPct}><span>{changepct}%</span></TableCell>
			<TableCell align="center" className={hideable}>{totalvolume}</TableCell>
			<TableCell align="center" className={hideable}>{marketcap}</TableCell>
			<TableCell align="center" className={hideable}>
				<img src={chart} width={150} height={35} alt={name} />
			</TableCell>
		</TableRow >
	)
}

export default memo(CoinRow)