import axios from 'axios'

const api = axios.create({
  baseURL: '/api',   // hits the Vite proxy → FastAPI on :8000
})

export default api   