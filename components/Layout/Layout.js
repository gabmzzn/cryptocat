import Navbar from './Navbar/Navbar'
import scss from './Layout.module.scss'
import Footer from './Footer/Footer.js'

export default function Layout(props) {
    return <div className={scss.main}>
        <Navbar />
        <div className={scss.content}>
            {props.children}
        </div>
        <Footer />
    </div>
}