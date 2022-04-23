import MarketTable from "../../components/Market/MarketTable"
import { useState, useEffect } from 'react'

export default function Market() {

    return (
        <MarketTable />
    )

}

// export async function getStaticProps() {
//     const composedData = []
//     let plussign, updown = ''
//     Math.random() > 0.5 ? updown = '▲' : updown = '▼'
//     console.log('[API Data fetching]')
//     let prices = Object.values(await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`)).prices())
//     // Last hour timestamp
//     let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

//     for (let [i, currency] of symbolList.entries()) {
//         prices[0][currency].USD.CHANGEPCT24HOUR >= 0.00 ? plussign = '+' : plussign = ''
//         composedData.push(
//             {
//                 rank: i + 1,
//                 logo: prices[1][currency].USD.IMAGEURL,
//                 name: currenciesNames[i],
//                 symbol: currency,
//                 price: prices[1][currency].USD.PRICE.toLocaleString(
//                     'en-GB', {
//                     style: 'decimal',
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 5,
//                 }),
//                 changepct: plussign + prices[1][currency].USD.CHANGEPCT24HOUR,
//                 updown: updown,
//                 open24: prices[0][currency].USD.OPEN24HOUR,
//                 totalvolume: prices[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
//                 marketcap: prices[1][currency].USD.MKTCAP,
//                 sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
//             })
//         i++
//     }

//     return {
//         props: {
//             composedData
//         },
//         revalidate: 10,
//     }

// }