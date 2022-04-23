import Navbar from './navbar/Navbar'
import style from './Laxyout.module.css'

const Layout = (props) => {
    return <>
        <Navbar />
        <div className={style.main}>
            {props.children}
        </div>
    </>
}

export default Layout