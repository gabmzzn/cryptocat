import ExchangesTable from './Table/ExchangesTable'
import scss from './Exchanges.module.scss'

export default function Exchanges(props) {
    const { exchanges } = props
    return (<>
        <h2>Top Cryptocurrency Exchanges Ranked by Volume today</h2>
        <ExchangesTable exchanges={exchanges} />
    </>)
}