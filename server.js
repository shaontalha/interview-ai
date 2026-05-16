require('dotenv').config();
const app = require('./src/app'); // Imports the app module from above
const PORT = process.env.PORT || 5000;
const connectToDB=require("./src/config/database")

connectToDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});