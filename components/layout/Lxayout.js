import Navbar from './navbar/Nxavbar'
import style from './Layout.module.css'

const Layout = (props) => {
    return <>
        <Navbar />
        <div className={style.main}>
            {props.children}
        </div>
    </>
}

export default Layout