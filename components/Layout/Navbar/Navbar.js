/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button'
import Link from 'next/link'
import style from './Navbar.module.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'

const theme = createTheme({ palette: { primary: { main: '#000' } } })

export default function NavBar() {

	const router = useRouter()

	return (
		<div className={style.navbar}>
			<div className={style.content}>
				<Link href='/' passHref>
					<div className={style.logo}>
						<span>CRYPTO</span>
						<img src='/icon.webp' height={30} width={30} alt='' />
						<span>CAT</span>
					</div>
				</Link>
				<div className={style.buttons}>
					<ThemeProvider theme={theme}>
						<Link href='/market' passHref>
							<Button className={router.pathname == "/market" ? style.active : style.button}><span>MARKET</span></Button>
						</Link>
						<Link href='/coins/btc' passHref>
							<Button className={router.pathname.startsWith("/coins") ? style.active : style.button}>COIN INFO</Button>
						</Link>
						<Link href='/news' passHref>
							<Button className={router.pathname == "/news" ? style.active : style.button}>NEWS</Button>
						</Link>
						<Link href='/social' passHref>
							<Button className={router.pathname == "/social" ? style.active : style.button}>SOCIAL</Button>
						</Link>
						<Link href='/shop' passHref>
							<Button className={router.pathname == "/shop" ? style.active : style.button}>SHOP</Button>
						</Link>
						{/* <Link href='/exchanges' passHref>
							<Button className={router.pathname == "/exchanges" ? style.active : style.button}>EXCHANGES</Button>
						</Link> */}
						<Link href='/about' passHref>
							<Button className={router.pathname == "/about" ? style.active : style.button}>ABOUT</Button>
						</Link>
					</ThemeProvider>
				</div>
			</div>
		</div>
	)
}
