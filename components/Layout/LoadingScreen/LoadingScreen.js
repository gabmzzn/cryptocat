import scss from './LoadingScreen.module.scss'

export default function LoadingScreen() {
    return (
        <div className={scss.content}>
            <div className={scss.cuteCat}>
                <div className={scss.spinLoader}></div>
                <img className={scss.logo} src='/catn.webp' height={275} width={275} alt='' />
            </div>
        </div>
    )
}