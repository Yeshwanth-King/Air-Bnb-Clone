import connectDB from "@/app/lib/connectDB";
import PlaceModal from "@/app/models/Place";
import jws from "jsonwebtoken"
import User from "@/app/models/Users";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"


export async function GET(req, res) {
    await connectDB()
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        await connectDB()
        const user = jws.verify(token.value, jwsScret, {})
        const { name, email, _id } = await User.findById(user.id);
        const places = await PlaceModal.find({ owner: _id })
        return NextResponse.json({ places })
    }
    else {
        return NextResponse.json({ message: "No User" })
    }
}