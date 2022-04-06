import Navbar from './navbar/Navbar'
import style from './layout.module.css'

const Layout = (props) => {
    return <>
        <Navbar />
        <div className={style.main}>
            {props.children}
        </div>
    </>
}

export default Layout