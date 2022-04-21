import Button from '@mui/material/Button'
import Link from 'next/link'
import style from './navbar.module.css'


export default function NavBar() {
	return (
		<div className={style.navbar}>
			<div className={style.content}>
				<span>CRYPTO-CAT</span>
				<div className={style.buttons}>
					<Link href='/market' passHref>
						<Button className={style.button} variant="outlined">MARKET LIVE DATA</Button>
					</Link>
					<Link href='/coins/btc' passHref>
						<Button className={style.button} variant="outlined">COIN INFO</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
