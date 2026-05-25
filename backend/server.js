require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/config/database.js');

const PORT = process.env.PORT || 5000;

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});