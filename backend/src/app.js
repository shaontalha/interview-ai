const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectToDB = require("./config/database")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://interview-ai-zeta-silk.vercel.app",
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

module.exports = app
