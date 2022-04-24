function Home() {
  return (
    <div style={{
      display: 'flex', height: '50rem',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '120px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '15px' }} >Crypto</span>
        <img src='/logo.webp' height={125} width={125} alt='' />
        <span style={{ marginLeft: '15px' }} >Cat</span></h1>
    </div>

  )
}

export default Home