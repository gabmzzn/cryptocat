import scss from './Market.module.scss'
import { useState, useEffect } from 'react'
import ViewToggle from './ViewToggle/ViewToggle'
import MarketTable from './MarketTable/MarketTable'
import MarketGrid from './MarketGrid/MarketGrid'
import MarketRank from './MarketRank/MarketRank'

export default function Market(props) {

	const { coins } = props

	const [viewMode, setViewMode] = useState('grid')

	const handleViewMode = (event, mode) => {
		if (mode !== null) setViewMode(mode)
	}

	const fav = JSON.parse(localStorage.getItem('favs')) || []

	const [storedFavs, setStoredFavs] = useState(fav)

	const co = coins.filter(coin => fav.includes(coin.symbol))
	const [favorites, setFavorites] = useState(co)

	const handleFav = (change) => {
		const favs = [...storedFavs]
		if (favs.includes(change)) {
			favs.splice(favs.indexOf(change), 1)
		}
		else {
			favs.push(change)
		}
		setStoredFavs([...new Set(favs)])

		const favCoins = coins.filter(coin => favs.includes(coin.symbol))
		setFavorites(favCoins)
	}

	useEffect(() => {
		localStorage.setItem('favs', JSON.stringify(storedFavs))
	}, [storedFavs])

	return (<>
		<MarketRank coins={coins} />
		<div className={scss.sub}>
			<h3>Today&apos;s coins prices by Trade Volume 24h across all markets </h3>
			<ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
		</div>
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			{viewMode == 'grid' &&
				<MarketGrid coins={coins} /> ||
				<MarketTable
					onFavChange={handleFav}
					coins={coins}
					favorites={favorites}
					storedFavs={storedFavs}
					view={viewMode}
				/>}
		</div>
	</>)
}