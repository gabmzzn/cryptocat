import { getLinkPreview } from "link-preview-js"

export default async function (req, res) {

  const URL = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&excludeCategories=Sponsored'
  const json = await fetch(URL).then(r => r.json())

  let news = json.Data
    .filter(n =>
      n.source !== "cointelegraph" &&
      n.source !== "dailyhodl")
    .slice(0, 20)

  // const newsWithThumbnails = news.map((n, i) =>
  //   Object.assign(n, { image: thumbnails[i] })
  // )
  // const data = await Promise.all( //Great feature!!
  //   newsWithThumbnails.map(async n =>
  //     await getLinkPreview(n.url).then(n => n.images[0])
  //   )
  // )
  res.status(200).json(news)
}