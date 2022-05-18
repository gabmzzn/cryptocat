/* eslint-disable @next/next/no-img-element */
import scss from './LoadingScreen.module.scss'

export default function LoadingScreen() {

	const { screen, cuteCat, spinLoader, logo } = scss

	return (<div className={screen}>
		{/* <div className={scss.background}></div> */}
		<div className={cuteCat}>
			<div className={spinLoader}></div>
			<img className={logo} src='/catn.webp' height={275} width={275} alt='' />
		</div>
	</div>)
}