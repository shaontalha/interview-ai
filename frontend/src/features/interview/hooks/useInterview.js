import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById
} from '../services/interview.api'

import { useContext } from 'react'
import { InterviewContext } from '../interview.context'

export const useInterview = () => {

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

   const generateReport = async ({ jobDescription, selfDescription, resume }) => {
    setLoading(true)
    try {
        const response = await generateInterviewReport({
            jobDescription,
            selfDescription,
            resume
        })
        setReport(response.interviewReport)
        return response.interviewReport  // ✅ inside try
    } catch (error) {
        console.log(error)
        return null                      // ✅ inside catch, won't crash
    } finally {
        setLoading(false)
    }
}

    const getReportById = async (interviewId) => {

        setLoading(true)
        let response=null


        try {

            const response = await getInterviewReportById(interviewId)

            setReport(response.interviewReport)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () => {

        setLoading(true)
        let response=null


        try {

            const response = await getAllInterviewReports()

            setReports(response.interviewReport)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
        }
        return response.interviewReport
    }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports
    }
}