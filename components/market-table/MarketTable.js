import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { useDemoData } from '@mui/x-data-grid-generator'
import { RsvpTwoTone } from '@mui/icons-material'

const columns = [
  { field: 'rank' },
  { field: 'logo' },
  { field: 'name' },
  { field: 'symbol' },
  { field: 'price' },
  { field: 'changepct' },
  { field: 'marketcap' },
  { field: 'open24' },
  { field: 'totalvolume' },
  { field: 'sparkchart' },
  { field: 'updown' },
]

const MarketTable = () => {
  const [GeneralData, setGeneralData] = useState({})

  useEffect(() => {
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
      setGeneralData(composedData)
      console.log(composedData)
    }
    getData()
  }, [])

  return (
    <div style={{ height: 2000, width: '100%' }}>
      <DataGrid
        rows={GeneralData}
        getRowId={(row) => row.rank}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
      />
    </div>
  )
}

export default MarketTable