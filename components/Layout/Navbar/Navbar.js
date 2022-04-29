/* eslint-disable @next/next/no-img-element */
import scss from './Navbar.module.scss'
import cx from 'classnames'
import { useState, useEffect } from 'react'
import LinkButton from '../../UI/Buttons/LinkButton'
import Link from 'next/link'

export default function NavBar() {

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
					<LinkButton href='/market'>Market</LinkButton>
					<LinkButton href='/coins'>Coin Info</LinkButton>
					<LinkButton href='/news'>News</LinkButton>
					<LinkButton href='/exchanges'>Exchanges</LinkButton>
					<LinkButton href='/shop'>Shop</LinkButton>
					<LinkButton href='/about'>About</LinkButton>
				</div>
			</div>
		</div>
	)
}
