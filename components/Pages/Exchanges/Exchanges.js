import ExchangesTable from './ExchangesTable/ExchangesTable'
import scss from './Exchanges.module.scss'
import * as React from 'react'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import FormHelperText from '@mui/material/FormHelperText'

export default function Exchanges(props) {
	const { exchanges } = props
	return (<>
		<h2>Top Cryptocurrency Exchanges Ranked by Volume today</h2>
		<Box component="form" noValidate autoComplete="off">
			<FormControl sx={{ width: '25ch' }}>
				<OutlinedInput placeholder="Please enter text" />
			</FormControl>
		</Box>
		<ExchangesTable exchanges={exchanges} />
	</>)
}