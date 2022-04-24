import Image from 'next/image'
import style from './CoinTitle.module.css'

export default function CoinTitle(props) {

    return <div className={style.currencyHeader}>
        <Image width={50} height={50} src={`https://www.cryptocompare.com/${props.logo}`} priority={true} alt='' />
        <span className={style.currency}>{props.name}</span>
        <span className={style.symbol}>{props.symbol}</span>
    </div>
}