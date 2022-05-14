import Image from 'next/image'
import scss from './CoinTitle.module.scss'
import CoinPrice from './CoinPrice/CoinPrice'

export default function CoinTitle(props) {

    const { name, symbol, logo, high24, low24 } = props
    const price = props.price

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img width={50} height={50} src={`https://www.cryptocompare.com/${logo}`} alt='' />
                <span className={scss.currency}>{name}</span>
                <span className={scss.symbol}>{symbol}</span>
            </div>
            <div className={scss.priceBar}>
                <CoinPrice
                    symbol={symbol}
                    high={high24}
                    price={price}
                    low={low24}
                />
            </div>
        </div>)
}