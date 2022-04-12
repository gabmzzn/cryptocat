import { useEffect, useState } from "react"

export default function Test() {
    console.log('render')



    const [count, setCount] = useState([])

    useEffect(() => {

    })

    return <>
        <button>Click</button>
        <h1>{count}</h1>
    </>
}