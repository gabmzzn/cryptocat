import { useEffect, useState } from "react"
import Thing from "./Thing"

export default function Test() {

    const array1 = [1]
    const array2 = [1, 2]

    const [cosa1, setCosa1] = useState(1)
    const [cosa2, setCosa2] = useState(2)

    useEffect(() => {
        // setCosa2(9)
    }, [])

    console.log('render Test')
    return <>

        {array1.map((x, i) => {
            console.log('first')
            return <h1 key={i}>Cosa {cosa1}</h1>
        })
        }
        {array2.map((x, i) => {
            console.log('second')
            return <h1 key={i}>Coso {cosa2}</h1>
        })
        }

    </>
}