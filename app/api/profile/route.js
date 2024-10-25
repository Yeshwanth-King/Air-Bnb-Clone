export async function GET(req, res) {
    const { token } = req.cookies;
    console.log(req)
    return Response.json({ token })
}