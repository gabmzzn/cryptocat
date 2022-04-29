import scss from './Market.module.scss'
import { useState } from 'react'
import ViewToggle from './ViewToggle/ViewToggle'
import CoinTable from './CoinTable/CoinTable'
import CoinGrid from './CoinGrid/CoinGrid'

export default function Market(props) {

    const { coins } = props

    const [viewMode, setViewMode] = useState('grid')

    const handleViewMode = (event, mode) => {
        if (mode !== null) setViewMode(mode)
    }

    return (<>
        <h2>Market Live data</h2>
        <ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
        {viewMode == 'grid' ? <CoinGrid coins={coins} /> : <CoinTable coins={coins} />}
    </>)

}