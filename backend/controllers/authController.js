const user = require("./../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.userRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const result = await user.create(req.body)
        if (!result) {
            return res.status(401).json({
                message: "email has Already Registeres"
            })
        }
        const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY)

        res.json({
            message: "user Register Sucessfully",
            result: {
                name: result.name,
                email: result.email,
                id: result._id,
                admin: result.isAdmin,
                avatar: result.avatar,
                token
            }
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await user.findOne({ email })
        if (!result) {
            return res.status(401).json({
                message: "email Is Wrong"
            })
        }

        const checkPassword = await bcrypt.compare(password, result.password)
        if (!checkPassword) {
            return res.status(401).json({
                message: "Password Do Not Matcha"
            })
        }

        const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY)

        res.json({
            message: "user Login Sucessfully",
            result: {
                name: result.name,
                email: result.email,
                id: result._id,
                admin: result.isAdmin,
                avatar: result.avatar,
                token
            }
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}