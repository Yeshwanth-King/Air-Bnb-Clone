import { cookies } from "next/headers";
import jws from "jsonwebtoken"
import User from "@/app/models/Users";
import connectDB from "@/app/lib/connectDB";

const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"

export async function GET(req, res) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (token) {
        await connectDB()
        const user = jws.verify(token.value, jwsScret, {})
        const { name, email, _id } = await User.findById(user.id);
        console.log("User Found : ", name)
        return Response.json({ user: { name, email, _id } })
    }
    else {
        return Response.json({ user: null })
    }
}