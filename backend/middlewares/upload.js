const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const { dir } = require("console")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = "./public/uploads"

        if (fs.existsSync(dir)) {
            console.log("exist");
        } else {
            console.log("Not Exist");
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        req.body.image = "uploads/" + fn
        cb(null, fn)
    }
})

module.exports = multer({ storage })