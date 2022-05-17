import scss from './Market.module.scss'
import { useState, useEffect } from 'react'
import ViewToggle from './ViewToggle/ViewToggle'
import MarketTable from './MarketTable/MarketTable'
import MarketGrid from './MarketGrid/MarketGrid'
import MarketRank from './MarketRank/MarketRank'
import MarketFavorites from './MarketFavorites/MarketFavorites'

export default function Market(props) {

	const { coins } = props

	const [viewMode, setViewMode] = useState('grid')

	const handleViewMode = (event, mode) => {
		if (mode !== null) setViewMode(mode)
	}

	// const fav = JSON.parse(localStorage.getItem('favs'))
	const fav = coins.map(coin => { return { [coin.symbol]: false } })
	const [favorites, setFavorites] = useState(fav)

	const handleFav = (change) => {
		// const coin = Object.keys(change)[0]
		// favUpdate = favorites.indexOf(coin) = change.coin
		// setFavorites([...favUpdate, change])
	}

	useEffect(() => {
		console.log(favorites)
		localStorage.setItem('favs', JSON.stringify(favorites))
	}, [favorites])

	return (<>
		<MarketRank coins={coins} />
		<div className={scss.sub}>
			<h3>Today&apos;s coins prices by Trade Volume 24h across all markets </h3>
			<ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
		</div>
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			{viewMode == 'grid' &&
				<MarketGrid coins={coins} /> ||
				viewMode == 'table' &&
				<MarketTable
					onFavChange={handleFav}
					coins={coins}
					favorites={favorites}
				/> ||
				viewMode == 'favorites' && <MarketFavorites favorites={favorites} />}
		</div>
	</>)
}