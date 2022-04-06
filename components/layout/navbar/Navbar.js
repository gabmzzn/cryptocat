import style from './navbar.module.css'
import Button from '@mui/material/Button'
import Link from 'next/link'


const NavBar = () => {
	return (
		<div className={style.navbar}>
			<span>CRYPTO-CAT</span>
			<Link href='/market' passHref>
				<Button variant="contained">MARKET LIVE DATA</Button>
			</Link>
			<Link href='/coins' passHref>
				<Button variant="contained">COIN INFO</Button>
			</Link>

		</div>
	)
}

export default NavBar
