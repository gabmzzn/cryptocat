import scss from './MarketTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CoinRow from './CoinRow/CoinRow'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

export default function MarketTable(props) {

	const { coins, favorites, onFavChange, view } = props
	const { hideable, addFavs, heartBroken, table } = scss

	const handleFav = change => onFavChange(change)

	const coinList = coins.map((coin, i) =>
		<CoinRow
			key={coin.rank}
			coin={coin}
			fav={favorites[i][coin.symbol]}
			onFavChange={handleFav}
		/>)

	const favs = coins
		.filter((coin, i) => favorites[i][coin.symbol])
		.map((coin, i) =>
			<CoinRow
				key={coin.rank}
				coin={coin}
				fav={favorites[i][coin.symbol]}
				onFavChange={handleFav}
			/>)


	const showTable = !favs.length && view == 'favs' ? false : true

	return (
		<>
			{showTable ?
				<TableContainer className={table}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center" className={hideable}>#</TableCell>
								<TableCell align="left">CURRENCY</TableCell>
								<TableCell align="center" width={150}>PRICE</TableCell>
								<TableCell align="center">LAST 24h</TableCell>
								<TableCell align="center" className={hideable}>TOTAL VOL</TableCell>
								<TableCell align="center" className={hideable}>MARKET CAP</TableCell>
								<TableCell align="center" className={hideable}>LAST 7 DAYS</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{view == 'table' ? coinList : favs}
						</TableBody>
					</Table>
				</TableContainer> :
				<div className={addFavs}>
					<h2>No favorites found</h2>
					<HeartBrokenIcon className={heartBroken} />
					<h2>Add your favorites coins to the list!</h2>
				</div>}
		</>

	)
}