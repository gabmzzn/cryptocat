import scss from './CoinTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CoinRow from './CoinRow/CoinRow'

export default function CoinTable(props) {

  const { coins } = props


  return (
    <TableContainer className={scss.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">CURRENCY</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="center">LAST 24h</TableCell>
            <TableCell align="center">TOTAL VOL</TableCell>
            <TableCell align="center">MARKET CAP</TableCell>
            <TableCell align="center">LAST 7 DAYS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map(coin => <CoinRow coin={coin} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}