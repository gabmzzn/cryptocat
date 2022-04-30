import * as React from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ViewToggle(props) {

    const { viewMode, onViewChange } = props

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={onViewChange}
                size="medium"
                aria-label="view-mode"
            >
                <ToggleButton value="grid" aria-label="grid">
                    <ViewModuleSharpIcon />
                </ToggleButton>
                <ToggleButton value="table" aria-label="table">
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
}