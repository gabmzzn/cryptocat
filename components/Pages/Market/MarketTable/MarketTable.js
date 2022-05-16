import scss from './MarketTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CoinRow from './CoinRow/CoinRow'

export default function MarketTable(props) {

	const { coins } = props
	const { hideable } = scss

	return (
		<TableContainer className={scss.table}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center" className={hideable}>#</TableCell>
						<TableCell align="center">CURRENCY</TableCell>
						<TableCell align="center" width={150}>PRICE</TableCell>
						<TableCell align="center">LAST 24h</TableCell>
						<TableCell align="center" className={hideable}>TOTAL VOL</TableCell>
						<TableCell align="center" className={hideable}>MARKET CAP</TableCell>
						<TableCell align="center" className={hideable}>LAST 7 DAYS</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{coins.map(coin => <CoinRow key={coin.rank} coin={coin} />)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}