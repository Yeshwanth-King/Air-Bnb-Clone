export async function GET(req, res) {
    const { token } = req.cookies;
    return Response.json({ token })
}