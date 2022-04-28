/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button'
import Link from 'next/link'
import scss from './Navbar.module.scss'
import cx from 'classnames'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const theme = createTheme({
	palette: {
		primary: {
			main: '#000'
		}
	},
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none'
			}
		}
	},
})

export default function NavBar() {

	const router = useRouter()
	const rn = router.pathname

	const [scroll, setScroll] = useState(false)

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScroll(window.scrollY > 5)
		})
	}, [])

	return (
		<div className={cx(scss.navbar, { [scss.navbarShadow]: scroll })}>
			<div className={scss.content}>
				<Link href='/' passHref>
					<div className={scss.logo}>
						<span>CRYPTO</span>
						<img src='/icon.webp' height={30} width={30} alt='' />
						<span>CAT</span>
					</div>
				</Link>
				<div className={scss.buttons}>
					<ThemeProvider theme={theme}>
						<Link href='/market' passHref>
							<Button className={rn == "/market" ? scss.active : scss.button}><span>Market</span></Button>
						</Link>
						<Link href='/coins/btc' passHref>
							<Button className={rn.startsWith("/coins") ? scss.active : scss.button}>Coin Info</Button>
						</Link>
						<Link href='/news' passHref>
							<Button className={rn == "/news" ? scss.active : scss.button}>News</Button>
						</Link>
						<Link href='/exchanges' passHref>
							<Button className={rn == "/exchanges" ? scss.active : scss.button}>Exchanges</Button>
						</Link>
						<Link href='/shop' passHref>
							<Button className={rn == "/shop" ? scss.active : scss.button}>Shop</Button>
						</Link>
						<Link href='/about' passHref>
							<Button className={rn == "/about" ? scss.active : scss.button}>About</Button>
						</Link>
					</ThemeProvider>
				</div>
			</div>
		</div>
	)
}
