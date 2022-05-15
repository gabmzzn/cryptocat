import scss from './News.module.scss'
import NewsCard from './NewsCard/NewsCard'

export default function News(props) {

  const { news } = props

  return (<>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70%' }} >
        <NewsCard news={news[0]} height={'400px'} fontSize={'45px'} description />
      </div>
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
        <NewsCard news={news[1]} height={'200px'} fontSize={'25px'} />
        <NewsCard news={news[2]} height={'200px'} fontSize={'25px'} />
      </div>
    </div>
    <div style={{ display: 'flex' }} className={scss.secondRow}>
      <NewsCard news={news[3]} fontSize={'25px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[4]} fontSize={'25px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[5]} fontSize={'25px'} height={'200px'} width={'33%'} />
    </div>
    <div style={{ display: 'flex' }} className={scss.thirdRow}>
      <NewsCard news={news[6]} fontSize={'20px'} height={'160px'} width={'25%'} />
      <NewsCard news={news[7]} fontSize={'20px'} height={'160px'} width={'25%'} />
      <NewsCard news={news[8]} fontSize={'20px'} height={'160px'} width={'25%'} />
      <NewsCard news={news[9]} fontSize={'20px'} height={'160px'} width={'25%'} />
    </div>
    <div style={{ display: 'flex' }} className={scss.thirdRow}>
      <NewsCard news={news[10]} fontSize={'20px'} height={'260px'} width={'50%'} />
      <NewsCard news={news[11]} fontSize={'20px'} height={'260px'} width={'50%'} />
    </div>
    <div style={{ display: 'flex' }} className={scss.thirdRow}>
      <NewsCard news={news[12]} fontSize={'20px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[13]} fontSize={'20px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[14]} fontSize={'20px'} height={'200px'} width={'33%'} />
    </div>
    <div style={{ display: 'flex' }} className={scss.thirdRow}>
      <NewsCard news={news[15]} fontSize={'20px'} height={'260px'} width={'50%'} />
      <NewsCard news={news[16]} fontSize={'20px'} height={'260px'} width={'50%'} />
    </div>
    <div style={{ display: 'flex' }} className={scss.secondRow}>
      <NewsCard news={news[17]} fontSize={'25px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[18]} fontSize={'25px'} height={'200px'} width={'33%'} />
      <NewsCard news={news[19]} fontSize={'25px'} height={'200px'} width={'33%'} />
    </div>
  </>)
}