import downloader from "image-downloader"
import fs from "fs";
import path from "path";
export async function POST(req, res) {
    const data = await req.json();
    console.log(__dirname)
    const newName = "Photo" + Date.now() + ".jpg"

    const uploadDir = path.join(__dirname, "uploads")

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const options = {
        url: data.link,
        dest: path.join(process.cwd(), "public", "uploads", newName)
    }
    const { fileName } = await downloader.image(options)
    console.log("Saved img ", fileName)

    return Response.json({ newName })
}