import CoinNewsCard from "./CoinNewsCard/CoinNewsCard"
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function CoinNews(props) {
  const { news } = props

  if (!news) return (
    <div style={{
      height: '350px', display: 'flex', alignItems: 'center'
    }}>
      <CircularProgress disableShrink sx={{ color: "gold", animationDuration: '0.7s', }} size={60} />
    </div>
  )

  return <>
    {news.map(n => <CoinNewsCard key={n.id} news={n} />)}
  </>
}