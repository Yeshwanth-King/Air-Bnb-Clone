import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jws from "jsonwebtoken"
import User from "@/app/models/Users";
import connectDB from "@/app/lib/connectDB";
import PlaceModal from "@/app/models/Place";

const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"

export async function POST(req, res) {
    let data = await req.json();
    console.log(data)
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        await connectDB()
        const user = jws.verify(token.value, jwsScret, {})
        const { name, email, _id } = await User.findById(user.id);
        data.owner = _id;
        console.log("User Found : ", name)
        let placeDoc = await PlaceModal.create(data)
        console.log(placeDoc);
        return NextResponse.json({ data })
    }
    else {
        return NextResponse.json({ message: "Please Login to Add Place" })
    }
}