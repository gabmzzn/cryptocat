import { getLinkPreview } from "link-preview-js"

export default async function NewsAPI(req, res) {

	let [categories, skip, amount] = req.query.news.split('=')

	if (categories.length < 3) categories = 'ALL_NEWS_CATEGORIES'

	const URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&excludeCategories=Sponsored&categories=${categories}`
	const json = await fetch(URL).then(r => r.json())

	const news = json.Data
		.filter(n =>
			n.source !== "cointelegraph" &&
			n.source !== "dailyhodl")
		.slice(skip, amount)

	const parsedNews = await Promise.all(
		news.map(async n => {
			const img = await getLinkPreview(n.url, {
				timeout: 6000
			}).then(n => n.images[0], e => n.imageurl)
			return Object.assign(n, { image: img })
		})
	)

	res.status(200).json(parsedNews)
}