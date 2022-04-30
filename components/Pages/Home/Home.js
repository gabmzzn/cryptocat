import scss from './Home.module.scss'

export default function Home() {
    return (
        <div className={scss.logo}>
            <h1><span>CRYPTO</span>
                <img src='/catn.webp' alt='Cute Cat' />
                <span>CAT</span>
            </h1>
        </div>)
}