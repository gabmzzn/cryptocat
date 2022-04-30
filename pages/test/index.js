import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { useState } from 'react'

export default function TemporaryDrawer() {

    const [state, setState] = useState(false)

    const toggleDrawer = (open) => () => {
        setState(open)
    }

    const list =
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button key={'Wasd'}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Wasd'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={'Wasd'}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Wasd'} />
                </ListItem>
            </List>
        </Box>


    return (
        <div>
            <Button onClick={toggleDrawer(true)}>{'right'}</Button>
            <Drawer
                anchor={'right'}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list}
            </Drawer>
        </div>
    )
}