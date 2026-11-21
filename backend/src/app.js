const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectToDB = require("./config/database")

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = (process.env.CLIENT_URL || "https://interview-ai-zeta-silk.vercel.app,http://localhost:5173")
    .split(",").map((o) => o.trim()).filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(async (req, res, next) => {
    try {
        await connectToDB()
        next()
    } catch (err) {
        res.status(503).json({ message: "Database connection failed" })
    }
})

const authRoutes = require("./routes/auth.routes")
const interviewRouter = require('./routes/interview.routes')

app.use("/api/auth", authRoutes)
app.use("/api/interview", interviewRouter)

// multer / unexpected errors -> JSON instead of an HTML stack trace
app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "Resume is too large (max 3MB)" })
    }
    console.error(err)
    res.status(err.status || 500).json({ message: err.message || "Internal server error" })
})

module.exports = app
