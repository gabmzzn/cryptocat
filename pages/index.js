import style from './index.module.css'

function Home() {
  return (
    <div className={style.logo}>
      <h1 style={{ fontSize: '120px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '-30px' }}>CRYPTO</span>
        <img src='/catn.webp' height={225} width={225} alt='' />
        <span style={{ marginLeft: '-30px' }} >CAT</span></h1>
    </div>

  )
}

export default Home