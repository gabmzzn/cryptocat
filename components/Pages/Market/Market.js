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
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
        {viewMode == 'grid' ? <CoinGrid coins={coins} /> : <CoinTable coins={coins} />}
    </>)

}