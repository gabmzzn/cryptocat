// import scss from './Market.module.scss'
// import { useState } from 'react'
// import ViewToggle from './ViewToggle/ViewToggle'
// import CoinTable from './CoinTable/CoinTable'
// import CoinGrid from './CoinGrid/CoinGrid'

// export default function Market(props) {

//     const { coins } = props

//     const [viewMode, setViewMode] = useState('grid')

//     const handleViewMode = (event, mode) => {
//         if (mode !== null) setViewMode(mode)
//     }

//     return (<>
//         <h2>Market Live data</h2>
//         <ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
//         {viewMode == 'grid' ? <CoinGrid coins={coins} /> : <CoinTable coins={coins} />}
//     </>)

// }

import scss from './Market.module.scss'
import { useState } from 'react'
import ViewToggle from './ViewToggle/ViewToggle'
import CoinTable from './CoinTable/CoinTable'
import CoinGrid from './CoinGrid/CoinGrid'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

export default function Market(props) {

    const { coins } = props

    const [viewMode, setViewMode] = useState('grid')

    const handleViewMode = (event, mode) => {
        if (mode !== null) setViewMode(mode)
    }

    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // return (<>
    //     <h2>Market Live data</h2>
    //     <ViewToggle viewMode={viewMode} onViewChange={handleViewMode} />
    //     {viewMode == 'grid' ? <CoinGrid coins={coins} /> : <CoinTable coins={coins} />}
    // </>)

    return (<>
        <h2>Market Live data</h2>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CoinGrid coins={coins} />
                </TabPanel>
                <TabPanel value="2">
                    <CoinTable coins={coins} />
                </TabPanel>
                <TabPanel value="3">
                    <h1>Quien te dijo que podias entrar aca la grone madre que te pario</h1>
                </TabPanel>
            </TabContext>
        </Box>
    </>)

}