import connectDB from "@/app/lib/connectDB";
import PlaceModal from "@/app/models/Place";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB();
    const place = await PlaceModal.find();
    return NextResponse.json({ place })
}