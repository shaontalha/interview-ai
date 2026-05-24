const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();


/**
 * @route   POST /
 * @desc    Generate a new AI interview report using resume, self description, and job description
 * @access  Private
 * @body    multipart/form-data
 *          - resume (file)
 *          - selfDescription
 *          - jobDescription
 */
interviewRouter.post(
    '/',
    authMiddleware.authUser,
    upload.single('resume'),
    interviewController.generateInterviewReportController
);


/**
 * @route   GET /report/:interviewId
 * @desc    Get a single interview report by interview ID
 * @access  Private
 * @params  interviewId
 */
interviewRouter.get(
    '/report/:interviewId',
    authMiddleware.authUser,
    interviewController.getInterviewReportByIdController
);


/**
 * @route   GET /
 * @desc    Get all interview reports for the authenticated user
 * @access  Private
 */
interviewRouter.get(
    '/',
    authMiddleware.authUser,
    interviewController.getAllInterviewReportsController
);


/**
 * @route   POST /resume/pdf/:interviewReportId
 * @desc    Generate and download ATS-friendly resume PDF based on interview report data
 * @access  Private
 * @params  interviewReportId
 */
interviewRouter.post(
    '/resume/pdf/:interviewReportId',
    authMiddleware.authUser,
    interviewController.generateResumePdfController
);

module.exports = interviewRouter;