require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/config/database.js');

const PORT = process.env.PORT || 5000;

// On Vercel the app runs as a serverless function: it must be exported, not listened on.
// The DB connection is opened per request by the middleware in app.js.
if (!process.env.VERCEL) {
    connectToDB().catch((err) => console.error("Initial DB connection failed:", err.message));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
