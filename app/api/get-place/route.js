import connectDB from "@/app/lib/connectDB";
import PlaceModal from "@/app/models/Place";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    await connectDB()
    let places = await PlaceModal.find();
    console.log(places)
    console.log("request was done")
    return NextResponse.json({ places })
}