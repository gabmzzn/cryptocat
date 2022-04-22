export default function CoinDescription(props) {
    const { name, symbol, description } = props.data
    return <>
        <h2>What is {name} ({symbol})?</h2>
        <p>{description}</p>
    </>
}