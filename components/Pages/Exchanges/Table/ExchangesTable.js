/* eslint-disable @next/next/no-img-element */
import scss from './ExchangesTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import Button from '@mui/material/Button'

export default function ExchangesTable(props) {

  const { exchanges } = props

  return (
    <TableContainer component={Paper} className={scss.table}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">RANK</TableCell>
            <TableCell align="left">EXCHANGE</TableCell>
            <TableCell align="center">TRUST SCORE</TableCell>
            <TableCell align="right">TRADE VOLUME 24h</TableCell>
            <TableCell align="center">COUNTRY</TableCell>
            <TableCell align="center">SINCE</TableCell>
            <TableCell align="center">WEBSITE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map(ex => {
            const year = ex.year_established == null ? 2020 : ex.year_established
            const volume = ex.trade_volume_24h_btc.toFixed(0)
            return (
              <TableRow key={ex.trust_score_rank}>
                <TableCell align="center">{ex.trust_score_rank}</TableCell>
                <TableCell align="left">
                  <div className={scss.name}>
                    <img src={ex.image} width={40} height={40} alt={ex.name} />
                    {ex.name}
                  </div>
                </TableCell>
                <TableCell align="center">{ex.trust_score}</TableCell>
                <TableCell align="right"><b>$ {volume} M</b></TableCell>
                <TableCell align="center">{ex.country}</TableCell>
                <TableCell align="center">{year}</TableCell>
                <TableCell align="right">
                  <a href={ex.url} target='_blank' rel="noreferrer">
                    <Button>{ex.url}</Button>
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