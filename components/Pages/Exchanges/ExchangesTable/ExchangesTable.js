/* eslint-disable @next/next/no-img-element */
import scss from './ExchangesTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ExchangesRow from './ExchangesRow/ExchangesRow'

export default function ExchangesTable(props) {

  const { exchanges } = props

  return (
    <TableContainer className={scss.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" className={scss.hideable}>RANK</TableCell>
            <TableCell align="left">EXCHANGE</TableCell>
            <TableCell align="center">TRUST SCORE</TableCell>
            <TableCell align="right" className={scss.hideable}>TRADE 24H</TableCell>
            <TableCell align="center" className={scss.hideable}>COUNTRY</TableCell>
            <TableCell align="center" className={scss.hideable}>SINCE</TableCell>
            <TableCell align="center">WEBSITE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map(ex => <ExchangesRow key={ex.rank} exchange={ex} />)}
        </TableBody>
      </Table>
    </TableContainer >
  )
}