import connectDB from "@/app/lib/connectDB";
import jws from "jsonwebtoken"
import Booking from "@/app/models/Booking";
import User from "@/app/models/Users";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"

export async function POST(req, res) {
    const data = await req.json();
    await connectDB();
    const booking = await Booking.create(data);
    return NextResponse.json({ data: booking })
}

export async function GET(req, res) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        await connectDB()
        const user = jws.verify(token.value, jwsScret, {})
        const { name, email, _id } = await User.findById(user.id);
        const bookings = await Booking.find({ user: _id }).populate("place")
        return NextResponse.json({ bookings })
    }
    else {
        return NextResponse.json({ message: "No User" })
    }

}