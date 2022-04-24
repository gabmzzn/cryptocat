import { useState, useEffect, useRef } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import Link from 'next/link'

import { w3cwebsocket as W3CWebSocket } from "websocket"
import style from './MarketTable.module.css'
import Skeleton from '@mui/material/Skeleton'
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen'


export default function MarketTable(props) {
  console.log('FIRST READING')
  const [isLoading, setIsLoading] = useState(true)
  const [currencyData, setCurrencyData] = useState([])

  useEffect(() => {
    console.log('USEEFFECT')
    async function getData() {
      console.log('GETDAATA')
      const composedData = []
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`
      const prices = Object.values(await fetch(URL).then(res => res.json()))
      // Last hour timestamp
      let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

      for (let [i, currency] of symbolList.entries()) {
        const sign = Math.sign(prices[0][currency].USD.CHANGEPCT24HOUR) == 1 ? '+' : ''
        composedData.push(
          {
            rank: i + 1,
            logo: prices[1][currency].USD.IMAGEURL,
            name: currenciesNames[i],
            symbol: currency,
            price: prices[1][currency].USD.PRICE.toLocaleString(
              'en-GB', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            }),
            changepct: sign + prices[1][currency].USD.CHANGEPCT24HOUR,
            updown: Math.random() > 0.5 ? '▲' : '▼',
            open24: prices[0][currency].USD.OPEN24HOUR,
            totalvolume: prices[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
            marketcap: prices[1][currency].USD.MKTCAP,
            sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
          })
        i++
      }
      setCurrencyData(composedData)
      console.log('FUNCTION CALL WEBSOCKET')
      getCurrencyData(composedData)
    }
    console.log('FUNCTION CALL')
    getData()

    // WebSocket Connection 
    const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
    const client = new W3CWebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`)

    async function getCurrencyData(currencyList) {
      console.log('[Websocket Connection]')
      // let performers = [...this.appService.currencyList].sort((a, b) => b.changepct - a.changepct)
      // performers.splice(3, 44)
      // this.performersSource = performers

      const subs = []
      currencyList.forEach(coin => {
        subs.push(`5~CCCAGG~${coin.symbol}~USD`)
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
        }
      }
      console.log('DISABEL LOADING ' + isLoading)
      setIsLoading(false)
    }

    return () => {
      console.log('CLIENT CLOSE')
      client.close()
    }

  }, [])

  console.log('IS LOADING? ' + isLoading)
  if (isLoading) return <LoadingScreen status={isLoading} />

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
            <TableCell align="center">LAST 7 DAYS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyData.map((row, i) => {
            return (
              <Link href={`/coins/${row.symbol.toLowerCase()}`} key={row.rank} passHref>
                <TableRow >
                  <TableCell align="right">{row.rank}</TableCell>
                  <TableCell align="left">
                    <div className={style.name}>
                      <Image src={`https://www.cryptocompare.com${row.logo}`} width={40} height={40} alt={row.name} priority={true} />
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
                  <TableCell align="right" className={0 < row.changepct ? style.higherpct : style.lowerpct}><span>{row.changepct}%</span></TableCell>
                  <TableCell align="right">{row.totalvolume}</TableCell>
                  <TableCell align="right">{row.marketcap}</TableCell>
                  <TableCell align="right">
                    <Image src={row.sparkchart} width={150} height={35} alt={row.name} priority={true} />
                  </TableCell>
                </TableRow>
              </Link>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}


const symbolList = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
  'DOGE', 'LUNA', 'UNI', 'AVAX', 'LINK', 'ALGO', 'LTC', 'BCH',
  'WBTC', 'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET',
  'FTT', 'ETC', 'TRX', 'DAI', 'DASH', 'OXT', 'FTM', 'EGLD', 'XMR', 'CAKE',
  'EOS', 'STX', 'AAVE', 'SUSHI', 'NEAR', 'SNX', 'QNT', 'GRT', 'NEO',
  'WAVES', 'KSM', 'LEO', 'MKR', 'CHR', 'ONE', 'HNT', 'AMP']

const currenciesNames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano',
  'Solana', 'XRP', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche',
  'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin',
  'Polygon', 'Axie Infinity', 'Cosmos', 'Internet Computer', 'Filecoin',
  'Tezos', 'Stellar', 'VeChain', 'FTX Token', 'Ethereum Classic', 'TRON',
  'Dai', 'Dash', 'Orchid Protocol', 'Fantom', 'Elrond', 'Monero', 'PancakeSwap', 'EOS',
  'Stacks', 'Aave', 'SushiSwap', 'NEAR Protocol', 'Synthetix', 'Quant',
  'The Graph', 'Neo', 'Waves', 'Kusama', 'LEO Token', 'Maker',
  'Chroma', 'Harmony', 'Helium', 'Amp']