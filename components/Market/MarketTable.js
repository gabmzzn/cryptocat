import { useState, useEffect, useRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Image from 'next/image'

import { w3cwebsocket as W3CWebSocket } from "websocket"
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

export default function MarketTable(props) {

  const [currencyData, setCurrencyData] = useState(props.data.composedData)

  useEffect(() => {
    async function getCurrencyData(currencyList) {
      console.log('[Websocket Connection]')
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

          // THIS POSSIBLY NEEDS OPTIMIZATION
          setCurrencyData([...currencyList])
          // priceRef.current[sym].className += '▼' == currencyList[sym].updown ? ' ' + style.higherprice : ' ' + style.lowerprice
          // priceRef.current[sym].textContent = currencyList[sym].updown + currencyList[sym].price

        }
      }
    }
    getCurrencyData(props.data.composedData)
  }, [props.data.composedData])

  return (<>
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
            <TableCell>LAST 7 DAYS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyData.map((row, i) => {
            return (
              <TableRow key={row.rank}>
                <TableCell align="right">{row.rank}</TableCell>
                <TableCell align="left">
                  <div className={style.name}>
                    <Image src={`https://www.cryptocompare.com${row.logo}`} width={40} height={40} alt={row.name} loading={'eager'} />
                    {row.name} {row.symbol}
                  </div>

                </TableCell>
                <TableCell align="right"
                  id={row.rank}
                  // ref={e => priceRef.current[i] = e}
                  style={{ fontWeight: 'bold', width: '200px' }}
                  className={'▲' == row.updown ? style.higherprice : style.lowerprice}
                >
                  <span>
                    {row.updown}{row.price}
                  </span>
                </TableCell>
                <TableCell align="right" className={0 < row.changepct ? style.higherpct : style.lowerpct}><span>{row.changepct}</span></TableCell>
                <TableCell align="right">{row.totalvolume}</TableCell>
                <TableCell align="right">{row.marketcap}</TableCell>
                <TableCell align="right">
                  <Image src={row.sparkchart} width={150} height={35} alt={row.name} loading={'eager'} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}