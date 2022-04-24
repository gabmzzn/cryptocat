import logo from './logo.png'
import style from './LoadingScreen.module.css'
import Image from 'next/image'

export default function LoadingScreen() {
    return (
        <div className={style.App}>
            <div className={style.spinLoader}></div>
            <Image className={style.logo} src={logo} height={275} width={275} alt="logo" />
        </div>
    )
}