import Image from 'next/image'
import scss from './CoinTitle.module.scss'

export default function CoinTitle(props) {

    return <div className={scss.currencyHeader}>
        <img width={50} height={50} src={`https://www.cryptocompare.com/${props.logo}`} alt='' />
        <span className={scss.currency}>{props.name}</span>
        <span className={scss.symbol}>{props.symbol}</span>
    </div>
}