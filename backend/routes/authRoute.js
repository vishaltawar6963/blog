const express = require("express")
const { protected } = require("./../middlewares/protected")
const profile = require("./../middlewares/profileUpload")
const { userRegister, userLogin } = require("../controllers/authController")
const routes = express.Router()

routes.post("/register", profile.single("avatar"), userRegister)
routes.post("/login", userLogin)

module.exports = routes