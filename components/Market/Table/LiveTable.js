/* eslint-disable @next/next/no-img-element */
import style from './LiveTable.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'

export default function LiveTable(props) {

  return (
    <TableContainer component={Paper} className={style.table}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="right">#</TableCell>
            <TableCell align="left">CURRENCY</TableCell>
            <TableCell align="right" width={150}>PRICE</TableCell>
            <TableCell align="right">LAST 24h</TableCell>
            <TableCell align="right">TOTAL VOL</TableCell>
            <TableCell align="right">MARKET CAP</TableCell>
            <TableCell align="center">LAST 7 DAYS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, i) => {
            return (
              <Link href={`/coins/${row.symbol.toLowerCase()}`} key={row.rank} passHref>
                <TableRow >
                  <TableCell align="right">{row.rank}</TableCell>
                  <TableCell align="left">
                    <div className={style.name}>
                      <img src={`https://www.cryptocompare.com${row.logo}`} width={40} height={40} alt={row.name} />
                      {row.name} {row.symbol}
                    </div>

                  </TableCell>
                  <TableCell align="right"
                    id={row.rank}
                    // ref={e => priceRef.current[i] = e}
                    style={{ fontWeight: 'bold', width: '200px' }}
                  >
                    <span className={row.updown == '▲' ? style.higherPrice : style.lowerPrice}>
                      <span className={row.updown == '▲' ? style.arrowUp : style.arrowDown}>{row.updown}</span>{row.price}
                    </span>
                  </TableCell>
                  <TableCell align="right" className={0 < row.changepct ? style.higherpct : style.lowerpct}><span>{row.changepct}%</span></TableCell>
                  <TableCell align="right">{row.totalvolume}</TableCell>
                  <TableCell align="right">{row.marketcap}</TableCell>
                  <TableCell align="right">
                    <img src={row.chart} width={150} height={35} alt={row.name} />
                  </TableCell>
                </TableRow>
              </Link>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}