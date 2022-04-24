import { useEffect, useState } from "react"
import Thing from "./Thing"
import { useTransition, animated } from 'react-spring'


export default function Test() {

    const [isVisible, setIsVisible] = useState(false)
    const transition = useTransition(isVisible, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    return <>
        <button onClick={() => {
            setIsVisible(v => !v)
        }}>Click</button>
        <div>
            {transition((style, item) =>
                item ? <animated.div style={style} className="cont">ASD</animated.div> : ''
            )}
        </div>
    </>
}