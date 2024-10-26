import { cookies } from "next/headers";

export async function POST(req, res) {
    const cookieStore = cookies();
    cookieStore.delete("token")

    return Response.json({ message: "Done" })
}