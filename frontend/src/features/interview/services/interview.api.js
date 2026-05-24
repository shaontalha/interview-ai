import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
    const formData = new FormData()  // ✅ capital F
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resume)

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export const getInterviewReportById = async (interviewId) => {  // ✅ plain param, not destructured
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get(`/api/interview`)  // ✅ removed stray }
    return response.data
}

export const generateResumePdf = async (interviewReportId) => {
    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`,
        {},
        { responseType: 'blob' }  
    )
    return response.data
}