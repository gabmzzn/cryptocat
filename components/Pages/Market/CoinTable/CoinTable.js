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
            <TableCell align="right">#</TableCell>
            <TableCell align="left">CURRENCY</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">LAST 24h</TableCell>
            <TableCell align="right">TOTAL VOL</TableCell>
            <TableCell align="right">MARKET CAP</TableCell>
            <TableCell align="center">LAST 7 DAYS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map(coin =>
            <Link href={`/coins/${coin.symbol.toLowerCase()}`} key={coin.rank} passHref>
              <TableRow >
                <TableCell align="right">{coin.rank}</TableCell>
                <TableCell align="left">
                  <div className={name}>
                    <img src={coin.logo} width={40} height={40} alt={coin.name} />
                    {coin.name}&nbsp;&nbsp;<span>{coin.symbol}</span>
                  </div>
                </TableCell>
                <TableCell align="right"
                  id={coin.rank}>
                  <span className={coin.updown == '▲' ? higherPrice : lowerPrice}>
                    {coin.updown}{coin.price}
                  </span>
                </TableCell>
                <TableCell align="right" className={coin.changepct > 0 ? higherPct : lowerPct}><span>{coin.changepct}%</span></TableCell>
                <TableCell align="right">{coin.totalvolume}</TableCell>
                <TableCell align="right">{coin.marketcap}</TableCell>
                <TableCell align="right">
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