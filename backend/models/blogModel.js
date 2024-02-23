const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: "user"
    },
    publish: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        // enum: ["Web Development", "App Development", "Data Scientist", "Game Developer"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Blog", blogSchema)