/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './Card.module.scss'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Card(props) {

  const { symbol, logo, updown, price, changepct, chart } = props.coin
  const { card, title, prices, initialPrice, higherPrice1, higherPrice2, lowerPrice1, lowerPrice2, higherPct, lowerPct } = scss

  const [priceStyle, setPriceStyle] = useState(initialPrice)
  const [coinPrice, setCoinPrice] = useState(null)

  useEffect(() => {
    if (coinPrice !== null) {
      if (price > coinPrice) {
        priceStyle == higherPrice1 ? setPriceStyle(higherPrice2) : setPriceStyle(higherPrice1)
      }
      else {
        priceStyle == lowerPrice1 ? setPriceStyle(lowerPrice2) : setPriceStyle(lowerPrice1)
      }
    }
    setCoinPrice(price)
  }, [price])

  return (
    <Link href={`/coins/${symbol.toLowerCase()}`} passHref>
      <div className={card}>
        <div className={title}>
          <h1>{symbol}</h1>
          <img src={logo} width={40} height={40} />
        </div>
        <div className={prices}>
          <span className={priceStyle}>
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