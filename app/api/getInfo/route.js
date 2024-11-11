import connectDB from "@/app/lib/connectDB";
import PlaceModal from "@/app/models/Place";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { id } = await req.json();
    await connectDB();
    const place = await PlaceModal.findById(id)
    console.log(place)
    return NextResponse.json({ place })
}