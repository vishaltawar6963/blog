const jwt = require("jsonwebtoken")

exports.protected = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                message: "Please Provide Token"
            })
        }
        const { userId } = jwt.verify(token, process.env.JWT_KEY)
        console.log(userId);
        if (!userId) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: "Error" + error
        })
    }
}