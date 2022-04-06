import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { useState, useEffect } from 'react'

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ]

// function createData(name, code, population, size) {
//   const density = population / size
//   return { name, code, population, size, density }
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ]

const MarketTable = () => {
  // const [page, setPage] = React.useState(0)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value)
  //   setPage(0)
  // }

  // const [GeneralData, setGeneralData] = useState({})

  async function getData() {
    let plussign, updown = ''
    let composedData = [], clist = '', i = 0
    const currencieslist = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
      'DOGE', 'LUNA', 'UNI', 'AVAX', 'LINK', 'ALGO', 'LTC', 'BCH',
      'WBTC', 'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET',
      'FTT', 'ETC', 'TRX', 'DAI', 'DASH', 'OXT', 'FTM', 'EGLD', 'XMR', 'CAKE',
      'EOS', 'STX', 'AAVE', 'SUSHI', 'NEAR', 'SNX', 'QNT', 'GRT', 'NEO',
      'WAVES', 'KSM', 'LEO', 'MKR', 'CHR', 'ONE', 'HNT', 'AMP']
    const currenciesnames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano',
      'Solana', 'XRP', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche',
      'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin',
      'Polygon', 'Axie Infinity', 'Cosmos', 'Internet Computer', 'Filecoin',
      'Tezos', 'Stellar', 'VeChain', 'FTX Token', 'Ethereum Classic', 'TRON',
      'Dai', 'Dash', 'Orchid Protocol', 'Fantom', 'Elrond', 'Monero', 'PancakeSwap', 'EOS',
      'Stacks', 'Aave', 'SushiSwap', 'NEAR Protocol', 'Synthetix', 'Quant',
      'The Graph', 'Neo', 'Waves', 'Kusama', 'LEO Token', 'Maker',
      'Chroma', 'Harmony', 'Helium', 'Amp']
    currencieslist.forEach(element => {
      clist += element + ','
    })
    let json = Object.values(await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
      clist + '&tsyms=USD').then(res => res.json()))

    // Last hour timestamp
    let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

    for (let currency of currencieslist) {
      // 0 = RAW Value, 1 = DISPLAY Value  
      json[0][currency].USD.CHANGEPCT24HOUR >= 0.00 ? plussign = '+' : plussign = ''
      composedData.push(
        {
          rank: i + 1,
          logo: json[1][currency].USD.IMAGEURL, //Ex: json.DISPLAY.BTC.USD.IMAGEURL
          name: currenciesnames[i],
          symbol: currency,
          price: json[1][currency].USD.PRICE.toLocaleString(
            'en-GB', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          }),
          changepct: plussign + json[1][currency].USD.CHANGEPCT24HOUR,
          updown: updown,
          open24: json[0][currency].USD.OPEN24HOUR,
          totalvolume: json[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
          marketcap: json[1][currency].USD.MKTCAP,
          sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
        })
      i++
    }
    console.log(composedData)
    return composedData
  }
  getData()

  return (
    <>
      <h1>asd</h1>
    </>
    // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    //   <TableContainer sx={{ maxHeight: 950 }}>
    //     <Table stickyHeader aria-label="sticky table">
    //       <TableHead>
    //         <TableRow>
    //           {columns.map((column) => (
    //             <TableCell
    //               key={column.id}
    //               align={column.align}
    //               style={{ minWidth: column.minWidth }}
    //             >
    //               {column.label}
    //             </TableCell>
    //           ))}
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows
    //           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //           .map((row) => {
    //             return (
    //               <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
    //                 {columns.map((column) => {
    //                   const value = row[column.id]
    //                   return (
    //                     <TableCell key={column.id} align={column.align}>
    //                       {column.format && typeof value === 'number'
    //                         ? column.format(value)
    //                         : value}
    //                     </TableCell>
    //                   )
    //                 })}
    //               </TableRow>
    //             )
    //           })}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <TablePagination
    //     rowsPerPageOptions={[10, 25, 100]}
    //     component="div"
    //     count={rows.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </Paper>
  )
}

export default MarketTable