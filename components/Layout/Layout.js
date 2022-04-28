import Navbar from './Navbar/Navbar'
import css from './Layout.module.css'
import Footer from './Footer/Footer.js'

export default function Layout(props) {
    return <div className={css.main}>
        <Navbar />
        <div className={css.content}>
            {props.children}
        </div>
        <Footer />
    </div>
}