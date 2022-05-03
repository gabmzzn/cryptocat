import scss from './NewsCard.module.scss'
import Button from '@mui/material/Button'

export default function NewsCard(props) {

  const { news, width, height, description, fontSize } = props
  const publishedAt = new Date(news.publishedAt).toDateString()

  return (
    <div className={scss.card} style={{ width: width }}>
      <h1 style={{ fontSize: fontSize }}>{news.title}</h1>
      {description && <div className={scss.description}>
        <span>{news.description}</span>
      </div>}
      <div style={{ width: '100%', height: height }}>
        <img src={news.urlToImage} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} />
      </div>
    </div>
  )
}

{/* <div className={scss.card}>
  <div>
    <div className={scss.title}>
      <h1>{news.title}</h1>
    </div>
    <div>
      {publishedAt} by {news.author}
    </div>
    <div className={scss.body}>
      <span>{news.description}</span>
    </div>
    <div className={scss.body}>
      <span>{news.content}</span>
    </div>
    <div>
      <a href={news.url} target='_blank' rel="noreferrer">
        <Button>Source: {news.source.name}</Button>
      </a>
    </div>
  </div>
  <div>
    <img src={news.urlToImage} width={200} height={140} style={{ objectFit: 'cover' }} />
  </div>
</div> */}