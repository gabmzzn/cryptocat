import scss from './CoinDescription.module.scss'

export default function CoinDescription(props) {

    const { name, symbol, description } = props
    const text = description.replaceAll(/\. /g, '.<br><br>')

    return <>
        <h2>What is {name} ({symbol})?</h2>
        <p className={scss.body}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    </>
}