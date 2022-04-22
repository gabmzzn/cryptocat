import Image from 'next/image'
import style from './CoinTitle.module.css'

export default function CoinTitle(props) {
    const selCurrency = 'Bitcoin'
    const selSymCurrency = 'BTC'
    const selCurrencyImage = 'https://www.cryptocompare.com/media/37746251/btc.png'
    return <div className={style.currencyHeader}>
        <Image width={50} height={50} src={selCurrencyImage} />
        <span className={style.currency}>{selCurrency}</span>
        <span className={style.symbol}>{selSymCurrency}</span>
    </div>
}