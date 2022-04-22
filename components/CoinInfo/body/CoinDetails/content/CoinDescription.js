export default function CoinDescription(props) {
    return <>
        <h2>What is {props.name} ({props.symbol})?</h2>
        <p>{props.description}</p>
    </>
}