export default function CoinDescription(props) {
    return <>
        <h2>What is {props.name} ({props.symbol})?</h2>
        <p
            style={{ lineHeight: 1.45 }}
            dangerouslySetInnerHTML={{ __html: props.description }}
        />
    </>
}