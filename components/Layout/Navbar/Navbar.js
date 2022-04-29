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

	const { logo, navbar, navbarShadow, content, buttons, button, active } = scss

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
				<div className={buttons}>
					<ThemeProvider theme={theme}>
						<Link href='/market' passHref>
							<Button className={rn == "/market" ? active : button}><span>Market</span></Button>
						</Link>
						<Link href='/coins/btc' passHref>
							<Button className={rn.startsWith("/coins") ? active : button}>Coin Info</Button>
						</Link>
						<Link href='/news' passHref>
							<Button className={rn == "/news" ? active : button}>News</Button>
						</Link>
						<Link href='/exchanges' passHref>
							<Button className={rn == "/exchanges" ? active : button}>Exchanges</Button>
						</Link>
						<Link href='/shop' passHref>
							<Button className={rn == "/shop" ? active : button}>Shop</Button>
						</Link>
						<Link href='/about' passHref>
							<Button className={rn == "/about" ? active : button}>About</Button>
						</Link>
					</ThemeProvider>
				</div>
			</div>
		</div>
	)
}
