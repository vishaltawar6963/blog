const express = require("express")
require("colors")
const dotenv = require('dotenv');
const cors = require("cors")
dotenv.config()

// routes
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute");
const connectDb = require("./config/db");
// routes


connectDb()


const app = express()

//static
// app.use(express.static("public"))
// Body Parser
app.use(express.json())
app.use(express.static("public"))

// Enable CORS
app.use(cors())

app.get('/' , (req , res)=>{
    res.send("api blog is running")
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)

const PORT = process.env.PORT 
app.listen(PORT, err => {
    err && console.log(`SERVER ERROR ${err}`.bgRed)
    console.log(`SERVER RUNNING On http://localhost:${PORT}`.bgBlue);
})

