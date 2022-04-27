import Navbar from './navbar/Navbar'
import style from './Layout.module.css'
import Footer from './Footer/Footer.js'

export default function Layout(props) {
    return <div className={style.main}>
        <Navbar />
        <div className={style.content}>
            {props.children}
        </div>
        <Footer />
    </div>
}