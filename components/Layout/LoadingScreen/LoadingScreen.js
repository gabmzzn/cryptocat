import css from './LoadingScreen.module.css'

export default function LoadingScreen() {
    return (
        <div className={css.content}>
            <div className={css.cuteCat}>
                <div className={css.spinLoader}></div>
                <img className={css.logo} src='/catn.webp' height={275} width={275} alt='' />
            </div>
        </div>
    )
}