/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import style from './CoinSidebar.module.css'
import Button from '@mui/material/Button'

export default function CoinSidebar(props) {
  const { price, symbol, high24, low24, priceChange,
    sortOrder, rating, technologyAdoptionRating,
    marketPerformanceRating, platformType, algorithm,
    assetWebsiteUrl, imageURL } = props.data
  const selCurrencyToCompare = 'USD'
  return <>
    <div className={style.container}>
      <div>
        <h2>{symbol} price to {selCurrencyToCompare}</h2>
      </div>
      <table>
        <tbody>
          <tr>
            <td className={style.coin}><img width={30} height={30} src={`https://www.cryptocompare.com/${imageURL}`} alt='' />
              {symbol}
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td className={style.coin}><img width={30} height={30} src={'https://cdn-icons-png.flaticon.com/512/197/197484.png'} alt='' />
              {selCurrencyToCompare}</td>
            <td>${price}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className={style.container}>
      <div>
        <h2>{symbol} Statistics and info</h2>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Price Change <span>24h</span></th>
              <td>${priceChange}</td>
            </tr>
            <tr>
              <th>High - Low <span>24h</span></th>
              <td>
                <div>
                  <span className="high">${high24}</span>
                </div>
                <div>
                  <span className="low">${low24}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>Ranking</th>
              <td><span>#{sortOrder}</span></td>
            </tr>
            <tr>
              <th>General Weiss Rating</th>
              <td><span>{rating}</span></td>
            </tr>
            <tr>
              <th>Technology Adoption</th>
              <td><span>{technologyAdoptionRating}</span></td>
            </tr>
            <tr>
              <th>Market Performance</th>
              <td><span>{marketPerformanceRating}</span></td>
            </tr>
            <tr>
              <th>Total coins mined</th>
              <td>{'19017937'}</td>
            </tr>
            <tr>
              <th>Platform Type</th>
              <td>{platformType}</td>
            </tr>
            <tr>
              <th>Algorithm</th>
              <td>{algorithm}</td>
            </tr>
            <tr>
              <th>Website:</th>
              <td>
                <a href={assetWebsiteUrl} target='_blank' rel="noreferrer">
                  <Button variant="outlined">Link</Button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}