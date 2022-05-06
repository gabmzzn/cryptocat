/* eslint-disable @next/next/no-img-element */
import scss from './LoadingScreen.module.scss'

export default function LoadingScreen() {

    const { screen, cuteCat, spinLoader, logo } = scss

    return (<div className={screen}>
        <div className={cuteCat}>
            <div className={spinLoader}></div>
            <img className={logo} src='/catn.webp' height={275} width={275} alt='' />
        </div>
    </div>)
}


//Outgoing effect, tested, not that good
// import scss from './LoadingScreen.module.scss'
// import { useState, useEffect } from 'react'
// import cx from 'classnames'

// export default function LoadingScreen(props) {
//     const { ready } = props
//     const [loading, setLoading] = useState(true)
//     const [render, setRender] = useState(false)
//     const [outStatus, setOutStatus] = useState(false)

//     useEffect(() => {
//         if (ready) {
//             setOutStatus(true)
//             setRender(true)
//             setTimeout(() => { setLoading(false) }, 3000)
//         }
//     }, [ready])

//     return (<>
//         {loading &&
//             <div className={cx(scss.content, { [scss.fadeOut]: outStatus })}>
//                 <div className={scss.cuteCat}>
//                     <div className={scss.spinLoader}></div>
//                     <img className={scss.logo} src='/catn.webp' height={275} width={275} alt='' />
//                 </div>
//             </div>}
//         {render && props.children}
//     </>)
// }