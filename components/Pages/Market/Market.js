import scss from './Market.module.scss'
import { useState } from 'react'
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

	return (<>
		<div className={scss.rankers}>
			<MarketRank />
			<MarketRank />
			<MarketRank />
		</div>
		<div className={scss.sub}>
			<h3>Today&apos;s cryptocurrency prices by volume 24h</h3>
			<ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
		</div>
		{viewMode == 'grid' ? <MarketGrid coins={coins} /> : <MarketTable coins={coins} />}
	</>)
}