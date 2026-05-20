const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')
const pdfParse = require('pdf-parse')
const { param } = require('../routes/interview.routes')

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

async function getInterviewReportByIdController(req,res) {
    const {interviewId}=req.params
    const interviewReport=await interviewReportModel.findOne({_id:interviewId, user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message:"Interview Not Found"
        })
    }

    res.status(200).json({
        message:"Interview Report found Successfully",
        interviewReport
    })
    
}

async function getAllInterviewReportsController(req,res) {
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillsGaps -preparationPlans")
    res.status(200).json({
        message:"Interview Report fetched Successfully",
        interviewReports
    })
}

module.exports = { generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController }