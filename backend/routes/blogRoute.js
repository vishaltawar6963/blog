const express = require("express")
const { createBlog, getAllBlog, getSingleBlog, updateBlog, deleteBlog, deleteAllBlog, getUsereBlog } = require("../controllers/blogController")
const upload = require("../middlewares/upload")
const { protected } = require("./../middlewares/protected")
const routes = express.Router()

routes.post("/", protected, upload.single("image"), createBlog)
routes.get("/", getAllBlog)
routes.get("/:blogId", getSingleBlog)
routes.get("/user/:userId", getUsereBlog)
routes.put("/:blogId", protected, upload.single("image"), updateBlog)
routes.delete("/:blogId", protected, deleteBlog)
routes.delete("/", deleteAllBlog)

module.exports = routes 