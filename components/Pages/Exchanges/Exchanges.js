import ExchangesTable from './Table/ExchangesTable'
import scss from './Exchanges.module.scss'

export default function Exchanges(props) {
    const { exchanges } = props
    return (<>
        <h2>Top Exchanges Platforms of last 24 hours</h2>
        <ExchangesTable exchanges={exchanges} />
    </>)
}