import { useEffect, useState } from "react"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import scss from './CoinPrice.module.scss'

const date = (new Date()).toString()
const timeLastHour = Date.parse((date.substr(0, 18) + ':00:00' + date.substr(24))) / 1000

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#ebd86e',
  },
}))

export default function CoinPrice(props) {

  const { low, high, price, symbol } = props

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function percentile(low, price, high) {
      const a = Number(low.replace(/[^0-9.-]+/g, ""))
      const b = Number(price.replace(/[^0-9.-]+/g, ""))
      const c = Number(high.replace(/[^0-9.-]+/g, ""))

      return ((b - a) * 100) / (c - a)
    }
    setProgress(percentile(low, price, high))

  }, [price])

  return (<>
    <div style={{
      displax: 'flex', margin: '12px 0', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', width: '96%'
    }}>
      <span style={{ paddingRight: '15px', fontSize: '28px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{price}</span>
      <img src={`https://images.cryptocompare.com/sparkchart/${symbol}/USD/latest.png?ts=${timeLastHour}`} width={'115px'} style={{ imageRendering: '-webkit-optimize-contrast' }} />
    </div>
    <Box sx={{ width: '295px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>
    </Box>
    <div style={{ display: 'flex', width: '95%', flexDirection: 'row', justifyContent: 'space-between', margin: '7px 4px' }}>
      <span className={scss.lowBar}>Low: {low}</span>
      <span className={scss.highBar}>High: {high}</span>
    </div>
  </>)
}