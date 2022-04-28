import Image from 'next/image'
import css from './CoinTitle.module.css'

export default function CoinTitle(props) {

    return <div className={css.currencyHeader}>
        <img width={50} height={50} src={`https://www.cryptocompare.com/${props.logo}`} alt='' />
        <span className={css.currency}>{props.name}</span>
        <span className={css.symbol}>{props.symbol}</span>
    </div>
}