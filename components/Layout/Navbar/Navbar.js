/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button'
import Link from 'next/link'
import scss from './Navbar.module.scss'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Squash as Hamburger } from 'hamburger-react'
import { width } from '@mui/system'
import LinkButton from '../../UI/Buttons/LinkButton'

export default function NavBar() {

	const router = useRouter()
	const rp = router.pathname

	const [scroll, setScroll] = useState(false)

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 5)
		})
	}, [])

	const { logo, navbar, navbarShadow, content, buttons, button, active, hamburguer, navbarItems } = scss

	const [drawer, setDrawer] = useState(false)
	const toggleDrawer = (open) => () => {
		setDrawer(open)
	}

	const pages = <>
		<LinkButton href='/market'>Market</LinkButton>
		<LinkButton href='/coins/btc' activeOn='/coins'>Coin Info</LinkButton>
		<LinkButton href='/news'>News</LinkButton>
		<LinkButton href='/exchanges'>Exchanges</LinkButton>
		<LinkButton href='/shop'>Shop</LinkButton>
		<LinkButton href='/about'>About</LinkButton>
	</>

	return (
		<div className={cx(navbar, { [navbarShadow]: scroll })}>
			<div className={content}>
				<Link href='/' passHref>
					<div className={logo}>
						<span>CRYPTO</span>
						<img src='/icon.webp' height={30} width={30} alt='' />
						<span>CAT</span>
					</div>
				</Link>
				<div>
					<div className={navbarItems}>
						{pages}
					</div>
					<div className={hamburguer}>
						<Hamburger rounded toggled={drawer} toggle={toggleDrawer(true)} />
						<Drawer
							anchor={'right'}
							open={drawer}
							onClose={toggleDrawer(false)}
							BackdropProps={{ invisible: true }}
						// PaperProps={{ sx: { backgroundColor: 'transparent', backdropFilter: 'blur(30px)' } }}
						>
							<Box
								sx={{ width: 240 }}
								role="presentation"
								onClick={toggleDrawer(false)}
								onKeyDown={toggleDrawer(false)}
							>
								<List style={{ display: 'flex', flexDirection: 'column' }}>
									<div className={logo} style={{ margin: '10px 0' }}>
										<Link href='/' passHref>
											<div className={logo}>
												<span>CRYPTO</span>
												<img src='/icon.webp' height={30} width={30} alt='' />
												<span>CAT</span>
											</div>
										</Link>
									</div>
									<Divider style={{ margin: '10px 0' }} />
									{/* {pages} */}
								</List>
							</Box>
						</Drawer>
					</div>
				</div>
			</div>
		</div>
	)
}
