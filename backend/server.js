import 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import invokeGeminiAi from './src/services/ai.service.js';


const PORT = process.env.PORT || 5000;

connectToDB()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});