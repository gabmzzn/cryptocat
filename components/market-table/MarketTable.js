import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Image from 'next/image'

import { w3cwebsocket as W3CWebSocket } from "websocket"
import { compose } from 'redux'
import style from './MarketTable.module.css'

const symbolList = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
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

const Cell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const Row = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const MarketTable = () => {

  const [currencyData, setCurrencyData] = useState([])

  useEffect(() => {
    const composedData = []
    async function getData() {
      let plussign, updown = ''

      console.log('[API Data fetching]')
      let json = Object.values(await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`).then(res => res.json()))
      // Last hour timestamp
      let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

      for (const [i, currency] of symbolList.entries()) {
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
      setCurrencyData(composedData)
      getCurrencyData(composedData)
    }
    getData()
  }, [])

  async function getCurrencyData(currencyList) {
    console.log('websocket connection')
    // let performers = [...this.appService.currencyList].sort((a, b) => b.changepct - a.changepct)
    // performers.splice(3, 44)
    // this.performersSource = performers

    // WebSocket Connection 
    const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const client = new W3CWebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)
    const subs = []
    symbolList.forEach(symbol => {
      subs.push(`5~CCCAGG~${symbol}~USD`)
    })
    client.onopen = () => {
      client.send(JSON.stringify({
        "action": "SubAdd",
        "subs": subs
      }))
    }
    let subibaja = []
    for (let i = 0; i < 50; i++) {
      subibaja.push({
        price: currencyList[i].price
      })
    }

    client.onmessage = (message) => pushWebSocketData(JSON.parse(message.data))

    function pushWebSocketData(data) {
      if (data.PRICE !== undefined) {
        const sym = currencyList.findIndex(((obj) => obj.symbol == data.FROMSYMBOL))
        currencyList[sym].price = '$ ' + (data.PRICE.toLocaleString(
          'en-GB', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        }))
        currencyList[sym].changepct = (currencyList[sym].changepct >= 0 ? '+' : '') +
          (((data.PRICE - currencyList[sym].open24) / data.PRICE) * 100).toFixed(2)

        if (currencyList[sym].price > subibaja[sym].price) {
          subibaja[sym].price = currencyList[sym].price
          currencyList[sym].updown = '▲'
        } else if (currencyList[sym].price < subibaja) {
          subibaja[sym].price = currencyList[sym].price
          currencyList[sym].updown = '▼'
        }
        // let performers = [...currencyList].sort((a, b) => b.changepct - a.changepct)
        // performers.splice(3, 44)
        // performersSource = performers
        setCurrencyData([...currencyList])
      }
    }
  }

  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {/* <TableHead>
          <TableRow>
            <Cell>Name</Cell>
            <Cell align="right">Calories</Cell>
            <Cell align="right">Fat&nbsp;(g)</Cell>
            <Cell align="right">Carbs&nbsp;(g)</Cell>
            <Cell align="right">Protein&nbsp;(g)</Cell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {currencyData.map((row) => {
            return (
              <Row key={row.rank}>
                <Cell align="right">{row.rank}</Cell>
                <Cell align="right">
                  <img src={`https://www.cryptocompare.com${row.logo}`} width={30} height={30} layout="responsive" alt={row.name} />
                </Cell>
                <Cell align="right">{row.name}</Cell>
                <Cell align="right">{row.symbol}</Cell>
                <Cell align="right"
                  style={{ fontWeight: 'bold' }}
                  className={'▼' == row.updown ? style.higherprice : style.lowerprice}>
                  {row.updown}{row.price}
                </Cell>
                <Cell align="right">{row.changepct}</Cell>
                <Cell align="right">{row.marketcap}</Cell>
                <Cell align="right">{row.open24}</Cell>
                <Cell align="right">{row.totalvolume}</Cell>
                <Cell align="right">{row.sparkchart}</Cell>
              </Row>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default MarketTable