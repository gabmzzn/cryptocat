import * as React from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleButtonNotEmpty() {
    const [viewMode, setViewMode] = React.useState('module')

    const handleMode = (event, mode) => {
        if (mode !== null) setViewMode(mode)
    }

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleMode}
                size="large"
                aria-label="view-mode"
            >
                <ToggleButton value="module" aria-label="module">
                    <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list">
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
}