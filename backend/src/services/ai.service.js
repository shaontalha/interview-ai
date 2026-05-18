const { GoogleGenAI } = require("@google/genai");
const {z} = require('zod')
const {zodToJsonSchema}= require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema=z.object({
    matchScore: z.number()
    .min(0)
    .max(100)
    .description("Overall percentage match score between the candidate profile and the job requirements"),
    technicalQuestions: z.array(z.object({
    question: z.string().description("The technical question can be asked in interview"),

    intention: z.string().description("The intention of interviewer behind asking the question"),

    answer: z.string().description("How to answer the question, what points to cover, what approach to take etc.")
})).description("Technical questions can be asked along with their intention and how to answer them"),


behavioralQuestions: z.array(z.object({
    question: z.string().description("The behavioral question can be asked in interview"),

    intention: z.string().description("The intention of interviewer behind asking the question"),

    answer: z.string().description("How to answer the question, what points to cover, what approach to take etc.")
})).description("Behavioral questions can be asked along with their intention and how to answer them"),


skillsGaps: z.array(z.object({
    skill: z.string().description("The missing or weak skill identified from the candidate profile"),

    severity: z.enum(["low", "medium", "high"])
        .description("Severity level of the skill gap based on job requirements")

})).description("Skill gaps identified between the candidate profile and job requirements"),


preparationPlans: z.array(z.object({
    day: z.number()
        .description("The preparation day or timeline label"),

    focus: z.string()
        .description("Main focus area or topic for that day"),

    tasks: z.array(z.string())
        .description("List of preparation tasks or activities to complete")

})).description("Structured preparation roadmap with daily focus areas and tasks"),




})

async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const prompt = `
Please analyze the following candidate information and generate a complete interview preparation report.

You will receive:
1. Resume text
2. Self description from the candidate
3. Job description

Your task is to:
- Analyze how well the candidate matches the job requirements
- Generate a realistic match score between 0 and 100
- Create technical interview questions based on the job description and candidate skills
- Create behavioral interview questions relevant to the role
- Identify missing or weak skills
- Generate a practical preparation roadmap for the candidate

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Please provide the response in the following structured JSON format:

{
  "matchScore": number,

  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],

  "skillsGaps": [
    {
      "skill": "string",
      "severity": "low | medium | high"
    }
  ],

  "preparationPlans": [
    {
      "day": "string",
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

Important instructions:
- Do not generate fake certifications or fake experience
- Questions should be realistic for the given job role
- Match score should be balanced, not unrealistically high
- Skill gaps should be based on actual differences between resume and job description
- Preparation plan should be actionable and practical
- Return ONLY valid JSON
`;

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            schema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))

    
}

module.exports = generateInterviewReport