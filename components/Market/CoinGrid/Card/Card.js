/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './Card.module.scss'
import Link from 'next/link'

export default function Card(props) {

    const coin = props.data

    return (
        <Link href={`/coins/${coin.symbol.toLowerCase()}`} passHref>
            <div className={scss.card}>
                <div className={scss.title}>
                    <h1>{coin.symbol}</h1>
                    <img src={coin.logo} width={40} height={40} />
                </div>
                <div className={scss.subtitle}>
                    <span className={coin.updown == '▲' ? scss.higherPrice : scss.lowerPrice}>
                        {coin.updown}
                        {coin.price}
                    </span>
                    <span className={coin.changepct > 0 ? scss.higherpct : scss.lowerpct}>
                        {coin.changepct}%
                    </span>
                </div>
                <div className={scss.chart}>
                    <img src={coin.chart} />
                </div>
            </div>
        </Link>
    )
}