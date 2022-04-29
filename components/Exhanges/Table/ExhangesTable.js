import scss from './Exchanges.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Link from 'next/link'

export default function ExchangesTable(props) {

    const { exchanges } = props

    return (
        <div>
            {exchanges.map(e => { return JSON.stringify(e) })}
        </div>

        // <TableContainer component={Paper} className={scss.table}>
        //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell align="right">#</TableCell>
        //                 <TableCell align="left">CURRENCY</TableCell>
        //                 <TableCell align="right" width={150}>PRICE</TableCell>
        //                 <TableCell align="right">LAST 24h</TableCell>
        //                 <TableCell align="right">TOTAL VOL</TableCell>
        //                 <TableCell align="right">MARKET CAP</TableCell>
        //                 <TableCell align="center">LAST 7 DAYS</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {props.data.map((coin, i) => {
        //                 return (
        //                     <Link href={`/coins/${coin.symbol.toLowerCase()}`} key={coin.rank} passHref>
        //                         <TableRow >
        //                             <TableCell align="right">{coin.rank}</TableCell>
        //                             <TableCell align="left">
        //                                 <div className={scss.name}>
        //                                     <img src={coin.logo} width={40} height={40} alt={coin.name} />
        //                                     {coin.name} {coin.symbol}
        //                                 </div>

        //                             </TableCell>
        //                             <TableCell align="right"
        //                                 id={coin.rank}
        //                                 // ref={e => priceRef.current[i] = e}
        //                                 scss={{ fontWeight: 'bold', width: '200px' }}
        //                             >
        //                                 <span className={coin.updown == '▲' ? scss.higherPrice : scss.lowerPrice}>
        //                                     <span className={coin.updown == '▲' ? scss.arrowUp : scss.arrowDown}>{coin.updown}</span>{coin.price}
        //                                 </span>
        //                             </TableCell>
        //                             <TableCell align="right" className={coin.changepct > 0 ? scss.higherpct : scss.lowerpct}><span>{coin.changepct}%</span></TableCell>
        //                             <TableCell align="right">{coin.totalvolume}</TableCell>
        //                             <TableCell align="right">{coin.marketcap}</TableCell>
        //                             <TableCell align="right">
        //                                 <img src={coin.chart} width={150} height={35} alt={coin.name} />
        //                             </TableCell>
        //                         </TableRow>
        //                     </Link>
        //                 )
        //             })}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    )
}