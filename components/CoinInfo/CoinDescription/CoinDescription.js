import css from './CoinDescription.module.css'

export default function CoinDescription(props) {

    const body = props.description.replaceAll(/\. /g, '.<br><br>')

    return <>
        <h2>What is {props.name} ({props.symbol})?</h2>
        <p className={css.body}
            dangerouslySetInnerHTML={{ __html: body }}
        />
    </>
}