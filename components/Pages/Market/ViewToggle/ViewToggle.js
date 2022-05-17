import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import scss from './ViewToggle.module.scss'

export default function ViewToggle(props) {

	const { viewMode, onViewChange } = props
	const { content } = scss

	return (
		<Stack direction="row" className={content}>
			<ToggleButtonGroup
				value={viewMode}
				exclusive
				onChange={onViewChange}
				size="small"
				aria-label="view-mode"
			>
				<ToggleButton value="grid" aria-label="grid" sx={{ padding: '8px 16px' }}>
					<span>GRID&nbsp;</span>
					<GridViewSharpIcon />
				</ToggleButton>
				<ToggleButton value="table" aria-label="table" sx={{ padding: '0 16px' }}>
					<span>LIST&nbsp;</span>
					<TableRowsSharpIcon />
				</ToggleButton>
				<ToggleButton value="favorites" aria-label="favorites" sx={{ padding: '0 16px' }}>
					<span>FAVORITES&nbsp;</span>
					<FavoriteOutlinedIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</Stack>
	)
}