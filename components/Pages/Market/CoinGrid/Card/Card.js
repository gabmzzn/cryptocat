/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './Card.module.scss'
import Link from 'next/link'
import cx from 'classnames'
import { useState, useEffect } from 'react'

export default function Card(props) {

    const { symbol, logo, updown, price, changepct, chart } = props.coin
    const { card, title, prices, higherPrice, lowerPrice, higherPct, lowerPct } = scss

    return (
        <Link href={`/coins/${symbol.toLowerCase()}`} passHref>
            <div className={card}>
                <div className={title}>
                    <h1>{symbol}</h1>
                    <img src={logo} width={40} height={40} />
                </div>
                <div className={prices}>
                    <span className={updown == '▲' ? higherPrice : lowerPrice}>
                        {updown}
                        {price}
                    </span>
                    <span className={changepct > 0 ? higherPct : lowerPct}>
                        {changepct}%
                    </span>
                </div>
                <div className={scss.chart}>
                    <img src={chart} />
                </div>
            </div>
        </Link>
    )
}