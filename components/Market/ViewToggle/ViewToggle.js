import * as React from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ViewToggle(props) {

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={props.viewMode}
                exclusive
                onChange={props.onViewChange}
                size="large"
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