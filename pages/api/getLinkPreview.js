import { getLinkPreview, getPreviewFromContent } from "link-preview-js"

export default async function (req, res) {

  if (req.method == 'POST') {
    const body = JSON.parse(req.body).Data

    async function getPreview(url) {
      return (
        [JSON.stringify(await getLinkPreview(url[0].url)),
        JSON.stringify(await getLinkPreview(url[1].url)),
        JSON.stringify(await getLinkPreview(url[2].url)),
        JSON.stringify(await getLinkPreview(url[3].url)),
        JSON.stringify(await getLinkPreview(url[4].url)),
        JSON.stringify(await getLinkPreview(url[5].url)),
        JSON.stringify(await getLinkPreview(url[6].url)),
        JSON.stringify(await getLinkPreview(url[7].url))]
      )
    }

    const data = await getPreview(body)
    res.status(200).json(data)
  }



}