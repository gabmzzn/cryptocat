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

	const fav = JSON.parse(localStorage.getItem('favs')) ||
		coins.map(coin => { return { [coin.symbol]: false } })

	const [favorites, setFavorites] = useState(fav)

	const handleFav = (change) => {
		console.log(change)
		var index = favorites
			.findIndex(c =>
				Object.keys(c)[0] == Object.keys(change)[0])
		let favUpdate = [...favorites]
		favUpdate[index] = change
		setFavorites(favUpdate)
	}

	useEffect(() => {
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
				<MarketTable
					onFavChange={handleFav}
					coins={coins}
					favorites={favorites}
					view={viewMode}
				/>}
		</div>
	</>)
}