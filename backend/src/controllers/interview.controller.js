const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')
const pdfParse = require('pdf-parse')

async function generateInterviewReportController(req, res) {
    const resumeContent = await pdfParse(req.file.buffer)
    const resumeText = resumeContent.text

    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}

module.exports = { generateInterviewReportController }