import jwt from "jsonwebtoken"

export default (req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token, "this is dummy text");
        next()
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
}