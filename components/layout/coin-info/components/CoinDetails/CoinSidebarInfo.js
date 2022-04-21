import Image from "next/image"
import style from './CoinSidebar.module.css'

export default function CoinSidebarInfo() {
    const selCurrency = 'BTC'
    const selCurrencyToCompare = 'USD'
    const Price = '42,610.28'
    const ImageUrl = '/media/37746251/btc.png'
    const ImageUrlTC = 'https://cdn-icons-png.flaticon.com/512/197/197484.png'
    return <>
        <div className={style.container}>
            <div>
                <h2>{selCurrency} price to {selCurrencyToCompare}</h2>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><Image width={30} height={30} src={`https://www.cryptocompare.com${ImageUrl}`} />
                            {selCurrency}
                        </td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><Image width={30} height={30} src={ImageUrlTC} />
                            {selCurrencyToCompare}</td>
                        <td>${Price}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className={style.container}>
            <div>
                <h2>{selCurrency} Statistics and info</h2>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Price Change <span>24h</span></th>
                            <td>${' N '}</td>
                        </tr>
                        <tr>
                            <th>High - Low <span>24h</span></th>
                            <td>
                                <div>
                                    <span className="high">${'42,996.50'}</span>
                                </div>
                                <div>
                                    <span className="low">${'41,336.97'}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Ranking</th>
                            <td><span>#{'1'}</span></td>
                        </tr>
                        <tr>
                            <th>General Weiss Rating</th>
                            <td><span>{'B+'}</span></td>
                        </tr>
                        <tr>
                            <th>Technology Adoption</th>
                            <td><span>{'A-'}</span></td>
                        </tr>
                        <tr>
                            <th>Market Performance</th>
                            <td><span>{'B-'}</span></td>
                        </tr>
                        <tr>
                            <th>Total coins mined</th>
                            <td>{'19017937'}</td>
                        </tr>
                        <tr>
                            <th>Platform Type</th>
                            <td>{'blockchain'}</td>
                        </tr>
                        <tr>
                            <th>Algorithm</th>
                            <td>{'SHA-256'}</td>
                        </tr>
                        <tr>
                            <th>Website:</th>
                            <td>
                                <a href={'https://bitcoin.org/en/'}>
                                    External Link
                                    <div>
                                        open_in_new
                                    </div>
                                </a>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </>
}