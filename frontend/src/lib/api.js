import axios from "axios"

// Set VITE_API_URL in frontend/.env (local) or in the Vercel dashboard (production)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://interview-ai-backend-navy.vercel.app",
    withCredentials: true
})
