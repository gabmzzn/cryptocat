import logo from './logo.svg'
import style from './LoadingScreen.module.css'
import Image from 'next/image'

export default function LoadingScreen() {
    return (
        <div className={style.App}>
            <header className={style['App-header']}>
                <Image src={logo} height={400} className={style['App-logo']} alt="logo" />
                {/* <p>Loading data...</p> */}
            </header>
        </div>
    )
}