import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs'; // Using promises for cleaner async/await usage


const uploadDir = path.join(process.cwd(), "public/uploads")

console.log(uploadDir);

export async function POST(req) {
    const formData = await req.formData();

    const photos = formData.getAll("photos")
    console.log(photos)

    if (photos.length > 0) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        let filename = [];
        for (const photo of photos) {
            const photoName = "Photo-" + Date.now() + ".jpg";
            const buffer = Buffer.from(await photo.arrayBuffer())
            const filePath = path.resolve(uploadDir, photoName);
            fs.writeFileSync(filePath, buffer);
            filename.push(photoName);
        }


        return NextResponse.json({
            success: true,
            photos: filename, // Return the names of the uploaded files
        });

    } else {
        return NextResponse.json({
            success: false,
            message: 'No files uploaded.',
        });

    }

}