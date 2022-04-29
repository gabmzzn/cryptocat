/* eslint-disable @next/next/no-img-element */
import Button from '@mui/material/Button'
import Link from 'next/link'
import scss from './Navbar.module.scss'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function NavBar() {

	const router = useRouter()
	const rp = router.pathname

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
					<Link href='/market' passHref>
						<Button className={rp == "/market" ? active : button}>Market
						</Button>
					</Link>
					<Link href='/coins/btc' passHref>
						<Button className={rp.startsWith("/coins") ? active : button}>Coin Info</Button>
					</Link>
					<Link href='/news' passHref>
						<Button className={rp == "/news" ? active : button}>News</Button>
					</Link>
					<Link href='/exchanges' passHref>
						<Button className={rp == "/exchanges" ? active : button}>Exchanges</Button>
					</Link>
					<Link href='/shop' passHref>
						<Button className={rp == "/shop" ? active : button}>Shop</Button>
					</Link>
					<Link href='/about' passHref>
						<Button className={rp == "/about" ? active : button}>About</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
