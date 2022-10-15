const express = require("express")
require("colors")
require("dotenv").config({ path: "./config/.env" })
const cors = require("cors")

// routes
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
// routes

const { db } = require("./config/db")
db()


const app = express()

//static
// app.use(express.static("public"))
// Body Parser
app.use(express.json())
app.use(express.static("public"))

// Enable CORS
app.use(cors())


app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)

const PORT = process.env.PORT || 5500
app.listen(PORT, err => {
    err && console.log(`SERVER ERROR ${err}`.bgRed)
    console.log(`SERVER RUNNING On http://localhost:${PORT}`.bgBlue);
})