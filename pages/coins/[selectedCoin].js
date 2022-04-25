import CoinInfo from "../../components/CoinInfo/CoinInfo"
import { useRouter } from 'next/router'

export default function Coins() {
    const router = useRouter()
    const coin = router.query.selectedCoin
    if (coin) {
        return (
            <CoinInfo coin={coin} />
        )
    }

}