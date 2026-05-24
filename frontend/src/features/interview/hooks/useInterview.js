import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResumePdf
} from '../services/interview.api'

import { useContext, useEffect } from 'react'
import { InterviewContext } from '../interview.context'



export const useInterview = (interviewId) => {

    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used in InterviewProvider")
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resume
            })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("generateReport error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("getReportById error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.error("getReports error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewId) => {  // ✅ fixed name + param
    setLoading(true)
    try {
        const blob = await generateResumePdf(interviewId)  // ✅ pass interviewId
        const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }))  // ✅ fixed syntax
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `resume_${interviewId}.pdf`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)  // ✅ cleanup
        window.URL.revokeObjectURL(url)  // ✅ cleanup
    } catch (error) {
        console.error("getResumePdf error:", error)
    } finally {
        setLoading(false)
    }
}



    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    }
}