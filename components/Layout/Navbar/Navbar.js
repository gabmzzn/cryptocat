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

export default function NavBar() {

	const [scroll, setScroll] = useState(false)

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 5)
		})
	}, [])

	const { logo, navbar, navbarShadow, content, hamburgerButton, button, buttonActive, hamburguer, navbarItems } = scss

	const [drawer, setDrawer] = useState(false)
	const toggleDrawer = (open) => () => {
		setDrawer(open)
	}

	const router = useRouter()
	const rp = router.pathname

	const paths = [
		{ href: '/market', text: 'Market' },
		{ href: '/coins', text: 'Coin Info' },
		{ href: '/news', text: 'News' },
		{ href: '/exchanges', text: 'Exchanges' },
		{ href: '/shop', text: 'Shop' },
		{ href: '/about', text: 'About' },
	]

	const pages = paths.map(p => {
		return (
			<Link href={p.href} key={p.href} passHref>
				<Button className={rp.startsWith(p.href) ? buttonActive : button}>{p.text}</Button>
			</Link>)
	})

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
						<Button className={hamburgerButton} onClick={toggleDrawer(true)}>
							<MenuRoundedIcon fontSize="large" />
						</Button>
						<Drawer
							anchor={'right'}
							open={drawer}
							onClose={toggleDrawer(false)}
							BackdropProps={{ invisible: true }}
							PaperProps={{
								sx: {
									backgroundColor: 'rgba(255, 255, 255, 0.6)',
									backdropFilter: 'blur(20px)'
								}
							}}
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
									{pages}
								</List>
							</Box>
						</Drawer>
					</div>
				</div>
			</div>
		</div>
	)
}
