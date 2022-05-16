import scss from './MarketRank.module.scss'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'

export default function MarketRank() {
	return (
		<Table className={scss.table}>
			<TableBody>
				<TableRow>
					<TableCell align="left">Coin 1</TableCell>
				</TableRow>
				<TableRow>
					<TableCell align="left">Coin 1</TableCell>
				</TableRow>
				<TableRow>
					<TableCell align="left">Coin 1</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)

}