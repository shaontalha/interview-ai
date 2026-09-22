const connectToDB = require("./config/database");

app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        res.status(503).json({ message: "Database connection failed" });
    }
});
