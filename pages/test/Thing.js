import { useState } from "react"

export default function Thing(props) {

    const [cosa, setCosa] = useState(0)

    function but() {
        setCosa(cosa + 1)
    }

    return <>
        <button onClick={but}>asd</button>
        <h1>Cosa {cosa}</h1>
    </>
}