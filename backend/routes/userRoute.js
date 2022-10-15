const express = require("express")
const { protected } = require("./../middlewares/protected")
const profile = require("./../middlewares/profileUpload")
const { getAllUser, getSingleUser, updateUser, deleteUser, deleteAllUser } = require("../controllers/userController")
const routes = express.Router()


routes.get("/", getAllUser)
routes.get("/:userId", protected, getSingleUser)
routes.put("/:userId", protected, profile.single("avatar"), updateUser)
routes.delete("/:userId", deleteUser)
routes.delete("/", deleteAllUser)

module.exports = routes