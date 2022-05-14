/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import scss from './CoinSidebar.module.scss'
import Button from '@mui/material/Button'

export default function CoinSidebar(props) {

  const { symbol, high24, low24,
    sortOrder, rating, technologyAdoptionRating,
    marketPerformanceRating, platformType, algorithm,
    assetWebsiteUrl, totalCoinsMined, open24 } = props.data

  const price = Number(props.price.replace(/[^0-9.-]+/g, ""))
  let changePct = props.data.changePct
  const url = assetWebsiteUrl ? assetWebsiteUrl.substring(8).replace(/\/$/, '').split('/')[0] : ''

  const priceChange = '$ ' + (Math.abs((open24 - price))).toFixed(2)


  if (price >= open24) {
    changePct = '+' + ((((price - open24) / open24) * 100).toFixed(2))
  }
  else {
    changePct = '-' + (((open24 - price) / open24) * 100).toFixed(2)
  }

  return <>
    <div className={scss.container}>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Price Change <span>24h</span></th>
              <td>{priceChange}</td>
            </tr>
            <tr>
              <th>Percentile Change</th>
              <td>{changePct}%</td>
            </tr>
            <tr>
              <th>High - Low <span>24h</span></th>
              <td>
                <div>
                  <span className="high">{high24}</span>
                </div>
                <div>
                  <span className="low">{low24}</span>
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
              <td>{parseInt(totalCoinsMined).toLocaleString('en-GB')}</td>
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
                  <Button className={scss.button}>{url}</Button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}