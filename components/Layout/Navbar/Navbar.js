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
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import BarChartIcon from '@mui/icons-material/BarChart'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import BoltIcon from '@mui/icons-material/Bolt'

export default function NavBar() {

	const [scroll, setScroll] = useState(false)
	const { logoHome, navbar, navbarShadow, content, hamburgerButton, button, buttonActive, hamburguer, navbarItems, hamburgerItems } = scss

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 5)
		})
	}, [])

	const [drawer, setDrawer] = useState(false)
	const toggleDrawer = (open) => () => {
		setDrawer(open)
	}

	const router = useRouter()
	const rp = router.pathname

	const paths = [
		{ href: '/market', text: 'Market', icon: <AutoGraphIcon /> },
		{ href: '/coins', text: 'Coin Info', icon: <BarChartIcon /> },
		{ href: '/news', text: 'News', icon: <NewspaperIcon fontSize="small" /> },
		{ href: '/exchanges', text: 'Exchanges', icon: <CurrencyExchangeIcon fontSize="small" /> },
		// { href: '/shop', text: 'Shop' },
		{ href: '/about', text: 'About', icon: <BoltIcon /> },
	]

	const pages = paths.map(p => {
		return (
			<Link href={p.href} key={p.href} passHref>
				<Button className={rp.startsWith(p.href) ? buttonActive : button}>
					{p.text}&nbsp;{p.icon}
				</Button>
			</Link>)
	})

	const home = (
		<Link href='/' passHref>
			<div className={logoHome}>
				<span>CRYPTO</span>
				<img src='/icon.webp' height={30} width={30} alt='' />
				<span>CAT</span>
			</div>
		</Link>)

	return (
		<div className={cx(navbar, { [navbarShadow]: scroll })}>
			{/* Hamburger Menu */}
			<div className={hamburguer}>
				<Button className={hamburgerButton} onClick={toggleDrawer(true)}>
					<MenuRoundedIcon fontSize="large" />
				</Button>
				<Drawer
					anchor={'left'}
					open={drawer}
					onClose={toggleDrawer(false)}
					BackdropProps={{ invisible: true }}
					PaperProps={{
						sx: {
							width: '300px',
							background: 'linear-gradient(white 0%, white 50%, rgb(252, 244, 197) 100%)'
						}
					}}
				>
					<Box
						sx={{ width: '100%' }}
						role="presentation"
						onClick={toggleDrawer(false)}
						onKeyDown={toggleDrawer(false)}
					>
						<div className={hamburgerItems}>
							<List style={{ display: 'flex', flexDirection: 'column', fontSize: '29px' }}>
								<div style={{ margin: '10px 0' }}>
									{home}
								</div>
								<Divider style={{ margin: '10px 0' }} />
								{pages}
							</List>
						</div>
					</Box>
				</Drawer>
			</div>
			<div className={content}>
				{home}
				<div>
					<div className={navbarItems}>
						{pages}
					</div>
				</div>
			</div>
		</div>
	)
}
