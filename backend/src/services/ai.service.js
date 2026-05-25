const { GoogleGenAI } = require("@google/genai");
const {z} = require('zod')
const {zodToJsonSchema}= require('zod-to-json-schema')



const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number()
        .min(0)
        .max(100)
        .describe("Overall percentage match score between the candidate profile and the job requirements"),

    technicalQuestions: z.array(
        z.object({
            question: z.string()
                .describe("The technical question that can be asked in the interview"),

            intention: z.string()
                .describe("The intention of the interviewer behind asking the question"),

            answer: z.string()
                .describe("How to answer the question, what points to cover, and what approach to take")
        })
    ).describe("Technical questions along with their intention and suggested answers"),

    behavioralQuestions: z.array(
        z.object({
            question: z.string()
                .describe("The behavioral question that can be asked in the interview"),

            intention: z.string()
                .describe("The intention of the interviewer behind asking the question"),

            answer: z.string()
                .describe("How to answer the question, what points to cover, and what approach to take")
        })
    ).describe("Behavioral questions along with their intention and suggested answers"),

    skillsGaps: z.array(
        z.object({
            skill: z.string()
                .describe("The missing or weak skill identified from the candidate profile"),

            severity: z.enum(["low", "medium", "high"])
                .describe("Severity level of the skill gap based on job requirements")
        })
    ).describe("Skill gaps identified between the candidate profile and job requirements"),

    preparationPlans: z.array(
        z.object({
            day: z.number()
                .describe("The preparation day or timeline label"),

            focus: z.string()
                .describe("Main focus area or topic for that day"),

            tasks: z.array(z.string())
                .describe("List of preparation tasks or activities to complete")
        })
    ).describe("Structured preparation roadmap with daily focus areas and tasks"),
    title:z.string().describe("The title of the job for which the interview report is generated")
});

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
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        schema: zodToJsonSchema(interviewReportSchema)
    }
})

    return JSON.parse(response.text)

    
}

async function generatePdfFromHtml(html) {
    const chromium = await import('@sparticuz/chromium')  // ✅ dynamic import
    const puppeteer = await import('puppeteer-core')       // ✅ dynamic import

    const browser = await puppeteer.default.launch({
        args: chromium.default.args,
        defaultViewport: chromium.default.defaultViewport,
        executablePath: await chromium.default.executablePath(),
        headless: chromium.default.headless,
    })

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {           
            top: "20mm",
            bottom: "20mm",
            left: "20mm",
            right: "20mm"
        }
    })
    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z
            .string()
            .describe(
                "The complete HTML content of the resume that can be converted into a PDF using Puppeteer"
            )
    })

    const prompt = `
You are an expert resume writer and HTML resume designer.

Generate a professional ATS-friendly resume in clean HTML format using the following information.

CANDIDATE RESUME DATA:
${resume}

SELF DESCRIPTION:
${selfDescription}

TARGET JOB DESCRIPTION:
${jobDescription}

Requirements:
- Return ONLY a valid JSON object.
- The JSON object must contain a single field named "html".
- The "html" field must contain a complete HTML document.
- Use semantic HTML structure.
- Make the resume visually professional and modern.
- Keep the layout ATS-friendly and printer-friendly.
- Use inline CSS only.
- Avoid external libraries, scripts, CDN links, or images.
- Ensure the HTML works properly with Puppeteer PDF generation.
- Include sections only if relevant information exists.
- Highlight skills and experience relevant to the target job description.
- Keep formatting clean and readable.
- Use proper spacing, typography, and section hierarchy.
- Do not include markdown, explanations, or extra text outside the JSON response.

Expected response format:
{
  "html": "<!DOCTYPE html>..."
}
`
const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        schema: zodToJsonSchema(resumePdfSchema)
    }
})
const jsonContent= JSON.parse(response.text)
const pdfBuffer=await generatePdfFromHtml(jsonContent.html)
return pdfBuffer
}


module.exports = {generateInterviewReport,generateResumePdf}