const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')
const pdfParse = require('pdf-parse')

async function generateInterviewReportController(req, res) {
    try {
        const resumeContent = await pdfParse(req.file.buffer)
        const resumeText = resumeContent.text

        const { selfDescription, jobDescription } = req.body
        const title = jobDescription.split('\n')[0].replace(/[^a-zA-Z0-9\s,.\-&]/g, '').trim().substring(0, 60) || "Interview Report"

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            title,              // ✅ add this
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (error) {
        console.error("generateInterviewReportController error:", error)
        res.status(500).json({ error: error.message })
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        })
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview Not Found" })
        }
        res.status(200).json({
            message: "Interview Report found Successfully",
            interviewReport
        })
    } catch (error) {
        console.error("getInterviewReportByIdController error:", error)
        res.status(500).json({ error: error.message })
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -__v -technicalQuestions -behavioralQuestions -skillsGaps -preparationPlans")

        res.status(200).json({
            message: "Interview Report fetched Successfully",
            interviewReports
        })
    } catch (error) {
        console.error("getAllInterviewReportsController error:", error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
}