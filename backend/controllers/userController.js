const user = require("./../models/userModel")
const bcrypt = require("bcryptjs")

exports.getAllUser = async (req, res) => {
    try {

        const result = await user.find({ isAdmin: false })
        res.json({
            message: "All User Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.getSingleUser = async (req, res) => {
    try {
        if (!req.params.userId) {
            throw new Error("User Id Required")
        }

        const result = await user.findById(req.params.userId)

        res.json({
            message: "get Single User Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.updateUser = async (req, res) => {
    try {
        if (!req.params.userId) {
            throw new Error("User Id Required")
        }
        // console.log(req.file);
        const result = await user.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        fs.unlinkSync("public/" + result.image)
        res.json({
            message: "user Updated",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        if (!req.params.userId) {
            throw new Error("User Id Required")
        }
        const result = await user.findByIdAndDelete(req.params.userId);
        res.json({
            message: "user delete",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.deleteAllUser = async (req, res) => {
    try {
        const result = await user.deleteMany();
        return res.json({
            message: " ALl User delete success"
        })
    } catch (error) {
        res.status(400).json({
            message: "error" + error
        })
    }
}