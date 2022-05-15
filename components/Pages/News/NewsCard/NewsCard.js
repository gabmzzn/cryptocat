import scss from './NewsCard.module.scss'
import Button from '@mui/material/Button'

export default function NewsCard(props) {

  const { news, width, height, description, fontSize } = props

  const openPage = () => window.open(news.url, 'noreferrer')

  return (
    <div className={scss.card} style={{ width: width, cursor: 'pointer' }} onClick={openPage}>
      <h1 style={{ fontSize: fontSize }}>{news.title}</h1>
      {description && <div className={scss.description}>
        <span>{news.body}</span>
      </div>}
      <div style={{ width: '100%', height: height }}>
        <img src={news.image} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} />
      </div>
    </div>
  )
}