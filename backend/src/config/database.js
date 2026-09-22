const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

async function connectToDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 8000,
        }).then((m) => {
            console.log("connected to database");
            return m;
        }).catch((err) => {
            cached.promise = null; // allow retry on next request
            console.error("MongoDB connection error:", err.message);
            throw err;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = connectToDB;
