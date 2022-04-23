import MarketTable from "../../components/Market/MarketTable"

export default function Market({ composedData }) {
    if (composedData) {
        return (
            <MarketTable data={{ composedData }} />
        )
    }
    return (
        <h1>Loading data...</h1>
    )
}

export async function getStaticProps() {
    const composedData = []
    let plussign, updown = ''
    Math.random() > 0.5 ? updown = '▲' : updown = '▼'
    console.log('[API Data fetching]')
    let json = Object.values(await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolList.join()}&tsyms=USD`)).json())
    // Last hour timestamp
    let d = (new Date()).toString(), timestampLastHour = Date.parse((d.substr(0, 18) + ':00:00' + d.substr(24))) / 1000

    for (let [i, currency] of symbolList.entries()) {
        json[0][currency].USD.CHANGEPCT24HOUR >= 0.00 ? plussign = '+' : plussign = ''
        composedData.push(
            {
                rank: i + 1,
                logo: json[1][currency].USD.IMAGEURL,
                name: currenciesNames[i],
                symbol: currency,
                price: json[1][currency].USD.PRICE.toLocaleString(
                    'en-GB', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                }),
                changepct: plussign + json[1][currency].USD.CHANGEPCT24HOUR,
                updown: updown,
                open24: json[0][currency].USD.OPEN24HOUR,
                totalvolume: json[1][currency].USD.TOTALTOPTIERVOLUME24HTO,
                marketcap: json[1][currency].USD.MKTCAP,
                sparkchart: 'https://images.cryptocompare.com/sparkchart/' + currency + '/USD/latest.png?ts=' + timestampLastHour
            })
        i++
    }

    return {
        props: {
            composedData
        },
        revalidate: 10,
    }

}

const symbolList = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP',
    'DOGE', 'LUNA', 'UNI', 'AVAX', 'LINK', 'ALGO', 'LTC', 'BCH',
    'WBTC', 'MATIC', 'AXS', 'ATOM', 'ICP', 'FIL', 'XTZ', 'XLM', 'VET',
    'FTT', 'ETC', 'TRX', 'DAI', 'DASH', 'OXT', 'FTM', 'EGLD', 'XMR', 'CAKE',
    'EOS', 'STX', 'AAVE', 'SUSHI', 'NEAR', 'SNX', 'QNT', 'GRT', 'NEO',
    'WAVES', 'KSM', 'LEO', 'MKR', 'CHR', 'ONE', 'HNT', 'AMP']

const currenciesNames = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano',
    'Solana', 'XRP', 'Dogecoin', 'Terra', 'Uniswap', 'Avalanche',
    'Chainlink', 'Algorand', 'Litecoin', 'Bitcoin Cash', 'Wrapped Bitcoin',
    'Polygon', 'Axie Infinity', 'Cosmos', 'Internet Computer', 'Filecoin',
    'Tezos', 'Stellar', 'VeChain', 'FTX Token', 'Ethereum Classic', 'TRON',
    'Dai', 'Dash', 'Orchid Protocol', 'Fantom', 'Elrond', 'Monero', 'PancakeSwap', 'EOS',
    'Stacks', 'Aave', 'SushiSwap', 'NEAR Protocol', 'Synthetix', 'Quant',
    'The Graph', 'Neo', 'Waves', 'Kusama', 'LEO Token', 'Maker',
    'Chroma', 'Harmony', 'Helium', 'Amp']