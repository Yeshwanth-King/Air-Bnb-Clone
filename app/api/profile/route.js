import { cookies } from "next/headers";
import jws from "jsonwebtoken"
import User from "@/app/models/Users";

const jwsScret = "kenfolanfclkmxlcmpamfoenaofeafoaljfjmafeoka"

export async function GET(req, res) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log(token)
    if (token) {
        const user = jws.verify(token.value, jwsScret, {})

        const UserInfo = await User.findById(user.id);
        console.log(UserInfo)
        return Response.json({ user: UserInfo })
    }
    else {
        return Response.json({ user: null })
    }
}