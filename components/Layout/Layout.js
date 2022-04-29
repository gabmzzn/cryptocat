import scss from './Layout.module.scss'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer.js'

export default function Layout(props) {

    const { main, content } = scss

    return (
        <div className={main}>
            <Navbar />
            <div className={content}>
                {props.children}
            </div>
            <Footer />
        </div>)
}