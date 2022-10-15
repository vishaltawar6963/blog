const blog = require("./../models/blogModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")

exports.createBlog = async (req, res) => {
    try {

        const token = req.headers.authorization
        const { userId } = jwt.verify(token, process.env.JWT_KEY)
        if (!userId) {
            return res.status(401).json({
                message: "Please Provide UserId"
            })
        }

        const result = await blog.create({
            ...req.body,
            userId: userId
        })

        res.json({
            message: "Blog Created Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.getAllBlog = async (req, res) => {
    try {

        const result = await blog.find({ publish: true }).populate('userId', 'name email')
        res.json({
            message: "All Blog Fatch Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.getSingleBlog = async (req, res) => {
    try {
        if (!req.params.blogId) {
            throw new Error("Blog Id Required")
        }

        const result = await blog.findById(req.params.blogId).populate('userId', 'name email')

        res.json({
            message: "get Single Blog Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.getUsereBlog = async (req, res) => {
    try {
        if (!req.params.userId) {
            throw new Error("user Id Required")
        }

        const result = await blog.find({ userId: req.params.userId })
        if (result.length == 0) {
            return res.status(401).json({
                message: "blog Not Found"
            })
        }
        res.json({
            message: "get user Blog Sucessfully",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.updateBlog = async (req, res) => {
    try {
        if (!req.params.blogId) {
            throw new Error("Blog Id Required")
        }
        if (req.file) {
            const currentBlog = await blog.findById(req.params.blogId)
            console.log(currentBlog.image);
            fs.unlinkSync("public/" + currentBlog.image)
            console.log(currentBlog.image + "bb");
            const result = await blog.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
        } else {
            const result = await blog.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
        }

        res.json({
            message: "Blog Updated",
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error.message
        })
    }
}
exports.deleteBlog = async (req, res) => {
    try {
        if (!req.params.blogId) {
            throw new Error("Blog Id Required")
        }
        const result = await blog.findByIdAndDelete(req.params.blogId);
        res.json({
            message: "Blog delete",
            result
        })

    } catch (error) {
        res.status(401).json({
            message: "error" + error
        })
    }
}
exports.deleteAllBlog = async (req, res) => {
    try {
        const result = await blog.deleteMany();
        return res.json({
            message: " ALl User delete success"
        })
    } catch (error) {
        res.status(400).json({
            message: "error" + error
        })
    }
}