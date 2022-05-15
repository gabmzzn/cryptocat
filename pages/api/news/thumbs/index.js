import { getLinkPreview } from "link-preview-js"

export default async function (req, res) {

  if (req.method == 'POST') {
    const body = JSON.parse(req.body)
    const data = await Promise.all( //Great feature!!
      body.map(async n =>
        await getLinkPreview(n.url).then(n => n.images[0])
      )
    )
    res.status(200).json(data)
  }
}