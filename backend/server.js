import 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import invokeGeminiAi from './src/services/ai.service.js';
import {resume,selfDescription,jobDescription} from './src/services/temp.js'
import generateInterviewReport from './src/services/ai.service.js'

const PORT = process.env.PORT || 5000;

connectToDB()
generateInterviewReport({resume,selfDescription,jobDescription})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});