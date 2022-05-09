import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleSharpIcon from '@mui/icons-material/ViewModuleSharp'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import scss from './ViewToggle.module.scss'

export default function ViewToggle(props) {

    const { viewMode, onViewChange } = props
    const { content } = scss

    return (
        <Stack direction="row" spacing={4} className={content}>
            <ToggleButtonGroup
                value={viewMode}
                orientation="vertical"
                exclusive
                onChange={onViewChange}
                size="medium"
                aria-label="view-mode"
            >
                <ToggleButton value="grid" aria-label="grid">
                    <span style={{ lineHeight: '1' }}>Grid View&nbsp;</span>
                    <ViewModuleSharpIcon />
                </ToggleButton>
                <ToggleButton value="table" aria-label="table">
                    <span style={{ lineHeight: '1' }}>List view&nbsp;</span>
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
}