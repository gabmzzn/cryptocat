import scss from './CoinDescription.module.scss'

export default function CoinDescription(props) {

    const body = props.description.replaceAll(/\. /g, '.<br><br>')

    return <>
        <h2>What is {props.name} ({props.symbol})?</h2>
        <p className={scss.body}
            dangerouslySetInnerHTML={{ __html: body }}
        />
    </>
}