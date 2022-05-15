import { getLinkPreview } from "link-preview-js"

export default async function (req, res) {
  const [categories, amount] = req.query.news.split('=')

  const URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&excludeCategories=Sponsored&categories=${categories}`
  const json = await fetch(URL).then(r => r.json())

  const news = json.Data
    .filter(n =>
      n.source !== "cointelegraph" &&
      n.source !== "dailyhodl")
    .slice(0, amount)

  const parsedNews = await Promise.all(
    news.map(async n => {
      const img = await getLinkPreview(n.url).then(n => n.images[0])
      return Object.assign(n, { image: img })
    })
  )

  res.status(200).json(parsedNews)
}