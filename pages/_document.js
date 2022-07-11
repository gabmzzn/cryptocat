// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
				<title>CRYPTO😺CAT - Real-time Cryptocurrency Market Information</title>
				<meta name="title" content="CRYPTO😺CAT - Real-time Cryptocurrency Market Information" />
				<meta name="description" content="Find out the latest prices, general information, and news, of the cryptocurrency world!" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://cryptovcat.vercel.app/" />
				<meta property="og:title" content="CRYPTO😺CAT - Real-time Cryptocurrency Market Information" />
				<meta property="og:description" content="Find out the latest prices, general information, and news, of the cryptocurrency world!" />
				<meta property="og:image" content="http://cryptovcat.vercel.app/cat-thumb.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://cryptovcat.vercel.app/" />
				<meta property="twitter:title" content="CRYPTO😺CAT - Real-time Cryptocurrency Market Information" />
				<meta property="twitter:description" content="Find out the latest prices, general information, and news, of the cryptocurrency world!" />
				<meta property="twitter:image" content="http://cryptovcat.vercel.app/cat-thumb.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}