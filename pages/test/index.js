import { useState } from 'react'
import { Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TransitionGroup } from 'react-transition-group'


const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
)

export default function SimpleGrow() {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <TransitionGroup>
          <Slide direction="up">{icon}</Slide>
          {/* Conditionally applies the timeout prop to change the entry speed. */}
          <Slide
            direction="up"

            // style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 500 }}
          >
            {icon}
          </Slide>
          <Slide
            direction="up"

            // style={{ transformOrigin: '0 0 0' }}
            {...{ timeout: 500 }}
          >
            {icon}
          </Slide>
        </TransitionGroup>
      </Box>
    </Box>
  )
}