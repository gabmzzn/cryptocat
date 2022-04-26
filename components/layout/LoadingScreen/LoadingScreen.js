import style from './LoadingScreen.module.css'

export default function LoadingScreen() {
    return (
        <div className={style.App}>
            <div className={style.spinLoader}></div>
            <img className={style.logo} src='/catn.webp' height={275} width={275} alt='' />
        </div>
    )
}