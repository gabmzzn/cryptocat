import scss from './CoinInfo.module.scss'
import CoinChart from "./CoinChart/CoinChart"
import CoinDescription from "./CoinDescription/CoinDescription"
import CoinSidebar from "./CoinSidebar/CoinSidebar"
import CoinTitle from "./CoinTitle/CoinTitle"
import CoinNews from './CoinNews/CoinNews'
import { useState, useEffect } from 'react'

export default function CoinDetails(props) {

	const { coin, historicalData, topNews, news } = props

	const [price, setPrice] = useState(coin.price)

	function parsePrice(n) {
		return n.toLocaleString('en-GB',
			{ style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 5, })
	}

	useEffect(() => {
		let client = null // If its declared inside it doesnt work

		async function getLiveData(coins) {

			const apiKey = '6e659e1244d9e7ccf3b6bdf6ada561766883d528a2025f01004787c096d1b005'
			client = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`)

			const subs = [`5~CCCAGG~${coin.symbol}~USD`]

			client.onopen = () => {
				client.send(JSON.stringify({
					"action": "SubAdd",
					"subs": subs
				}))
			}

			client.onmessage = (message) => pushWebSocketData(JSON.parse(message.data))

			const previous = { price: coin.price }
			function pushWebSocketData(data) {
				if ('PRICE' in data) {
					const { PRICE, FROMSYMBOL } = data
					const { open24 } = coins
					coins.price = '$ ' + parsePrice(PRICE)
					coins.updown = coins.price > previous.price ? '▲' : '▼'
					previous.price = coins.price

					if (PRICE >= open24) {
						coins.changepct = '+' + ((((PRICE - open24) / open24) * 100).toFixed(2))
					}
					else {
						coins.changepct = '-' + (((open24 - PRICE) / open24) * 100).toFixed(2)
					}

					setPrice(coins.price)

				}
			}
		}

		getLiveData(coin)

		return () => {
			client.close()
		}
	}, [])


	return <div scss={{ margin: '0 30px' }}>
		<CoinTitle
			name={coin.name}
			symbol={coin.symbol}
			logo={coin.imageURL}
			high24={coin.high24}
			low24={coin.low24}
			price={price}
		/>
		<div className={scss.container}>
			<div className={scss.leftContainer}>
				<CoinChart
					name={coin.name}
					data={historicalData}
				/>
				<CoinDescription
					name={coin.name}
					symbol={coin.symbol}
					description={coin.description}
				/>
			</div>
			<div className={scss.rightContainer}>
				<CoinSidebar data={coin} price={price} />
			</div>
		</div>
		{/* <div className={scss.newsFeed}>
			<CoinNews topNews={topNews} news={news} />
		</div> */}
	</div>
}