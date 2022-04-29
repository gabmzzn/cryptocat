import scss from './Footer.module.scss'

export default function Footer() {

    return (
        <div className={scss.footer}>
            <p>This is a footer.
                This stays at the bottom of the page.</p>
        </div>)
}