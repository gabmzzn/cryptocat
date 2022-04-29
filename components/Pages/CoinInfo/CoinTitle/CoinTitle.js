import Image from 'next/image'
import scss from './CoinTitle.module.scss'

export default function CoinTitle(props) {

    const { name, symbol, logo } = props

    return (
        <div className={scss.currencyHeader}>
            <img width={50} height={50} src={`https://www.cryptocompare.com/${logo}`} alt='' />
            <span className={scss.currency}>{name}</span>
            <span className={scss.symbol}>{symbol}</span>
        </div>)
}