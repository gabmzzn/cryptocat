import Image from "next/image"

export default function CoinSidebarInfo() {
    const selectedCurrency = 'selectedCurrecny'
    const selectedCurrencyToCompare = 'selectedCurrencyToCompare'
    const Price = 454545
    const ImageUrl = 'asd'
    const ImageUrlTC = 'ImageUrlTC'
    return <div className="info-container">
        <div>
            <div>
                <div>{selectedCurrency} price to {selectedCurrencyToCompare}</div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><img src={`https://www.cryptocompare.com/${ImageUrl}`} />
                        </td>
                        <td>{selectedCurrency}</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><img src={ImageUrlTC} />
                        </td>
                        <td>{selectedCurrencyToCompare}</td>
                        <td>${Price}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <div>
                <div>{' selectedCurrency '} Statistics and info</div>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Price Change <span>24h</span></th>
                            <td>${' PriceChange '}</td>
                        </tr>
                        <tr>
                            <th>High - Low <span>24h</span></th>
                            <td>
                                <div>
                                    <span className="high">${' high24 '}</span>
                                </div>
                                <div>
                                    <span className="low">${' low24 '}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Ranking</th>
                            <td><span>#{' SortOrder '}</span></td>
                        </tr>
                        <tr>
                            <th>General Weiss Rating</th>
                            <td><span>{' Rating '}</span></td>
                        </tr>
                        <tr>
                            <th>Technology Adoption</th>
                            <td><span>{' TechnologyAdoptionRating '}</span></td>
                        </tr>
                        <tr>
                            <th>Market Performance</th>
                            <td><span>{' MarketPerformanceRating '}</span></td>
                        </tr>
                        <tr>
                            <th>Total coins mined</th>
                            <td>{' TotalCoinsMined '}</td>
                        </tr>
                        <tr>
                            <th>Platform Type</th>
                            <td>{' PlatformType '}</td>
                        </tr>
                        <tr>
                            <th>Algorithm</th>
                            <td>{' Algorithm '}</td>
                        </tr>
                        <tr>
                            <th>Website:</th>
                            <td>
                                <a href={' AssetWebsiteUrl '}>
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
    </div>
}