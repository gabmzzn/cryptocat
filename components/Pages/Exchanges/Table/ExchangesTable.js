/* eslint-disable @next/next/no-img-element */
import scss from './ExchangesTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'

export default function ExchangesTable(props) {

  const { exchanges } = props

  return (
    <TableContainer className={scss.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">RANK</TableCell>
            <TableCell align="left">EXCHANGE</TableCell>
            <TableCell align="center">TRUST SCORE</TableCell>
            <TableCell align="right">TRADE 24H</TableCell>
            <TableCell align="center">COUNTRY</TableCell>
            <TableCell align="center">SINCE</TableCell>
            <TableCell align="center">WEBSITE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map(ex => {
            const year = ex.year_established == null ? 2020 : ex.year_established
            const volume = ex.trade_volume_24h_btc.toFixed(0)
            const url = ex.url.substring(8).replace(/\/$/, '').split('/')[0]
            return (
              <TableRow key={ex.trust_score_rank}>
                <TableCell align="center">{ex.trust_score_rank}</TableCell>
                <TableCell align="left">
                  <div className={scss.name} style={{ whiteSpace: 'pre-line' }}>
                    <img src={ex.image} width={40} height={40} alt={ex.name} />
                    {ex.name}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Rating precision={0.5} name="read-only" value={ex.trust_score / 2} readOnly />
                </TableCell>
                <TableCell align="right"><b>$ {volume} M</b></TableCell>
                <TableCell align="center" style={{ whiteSpace: 'pre-line' }}>{ex.country}</TableCell>
                <TableCell align="center">{year}</TableCell>
                <TableCell align="right">
                  <a href={ex.url} target='_blank' rel="noreferrer">
                    <Button className={scss.button}>{url}</Button>
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer >
  )
}