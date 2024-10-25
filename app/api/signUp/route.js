import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/Users";
import * as argon2d from "argon2";
import jws from "jsonwebtoken"
import { NextResponse } from "next/server";



export async function GET(req, res) {
    console.log("Request was done")
    return Response.json({ message: "Data" })
}

export async function POST(req, res) {
    console.log("Request was done")
    await connectDB();
    let data = await req.json();
    const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"
    if (!data.name) {
        console.log("Login request")
        const userData = await User.find({ email: data.email })
        if (userData.length == 0) {
            return Response.json({ message: "User not Found" }, { status: 401 })
        }
        const isPassOk = await argon2d.verify(userData[0].password, data.password)
        if (isPassOk) {
            console.log("Password Match")
            const token = jws.sign({ email: userData[0].email, id: userData[0]._id }, jwsScret, {})
            console.log(token)
            const response = NextResponse.json(userData[0])
            response.cookies.set("token", token, {
                httpOnly: true, // Secure the cookie
                maxAge: 60 * 60 * 24, // Set expiration for 1 day
                path: '/',
                sameSite: 'strict',
            })
            return response;
        }
        else {
            console.log("Incorrect Password")
            return Response.error({ message: "Wrong Password" })
        }
    }
    else {
        console.log(data)
        const HashedPass = await argon2d.hash(data.password);
        data.password = HashedPass;
        const userData = await User.create(data)
        return Response.json({ userData })

    }

}
