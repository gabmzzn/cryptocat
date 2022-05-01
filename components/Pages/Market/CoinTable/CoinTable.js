import scss from './CoinTable.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'

export default function CoinTable(props) {

  const { coins } = props
  const { table, name, higherPrice, lowerPrice, higherPct, lowerPct } = scss

  return (
    <TableContainer component={Paper} elevation={0} className={table}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
          {coins.map(coin =>
            <Link href={`/coins/${coin.symbol.toLowerCase()}`} key={coin.rank} passHref>
              <TableRow >
                <TableCell align="center">{coin.rank}</TableCell>
                <TableCell align="left">
                  <div className={name}>
                    <img src={coin.logo} width={40} height={40} alt={coin.name} />
                    {coin.symbol}&nbsp;&nbsp;<span>{coin.name}</span>
                  </div>
                </TableCell>
                <TableCell align="right"
                  id={coin.rank}>
                  <span className={coin.updown == '▲' ? higherPrice : lowerPrice}>
                    {coin.updown}{coin.price}
                  </span>
                </TableCell>
                <TableCell align="center" className={coin.changepct > 0 ? higherPct : lowerPct}><span>{coin.changepct}%</span></TableCell>
                <TableCell align="center">{coin.totalvolume}</TableCell>
                <TableCell align="center">{coin.marketcap}</TableCell>
                <TableCell align="center">
                  <img src={coin.chart} width={150} height={35} alt={coin.name} />
                </TableCell>
              </TableRow>
            </Link>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}