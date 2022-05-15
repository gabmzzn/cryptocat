import { getLinkPreview } from "link-preview-js"

export default async function (req, res) {

  if (req.method == 'POST') {
    const body = JSON.parse(req.body)
    const data = await Promise.all( //Great feature!!
      body.map(async n =>
        JSON.parse(JSON.stringify(await getLinkPreview(n.url))).images[0]
      )
    )
    res.status(200).json(data)
  }
}