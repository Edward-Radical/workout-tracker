import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // from .env files
})

axiosInstance.interceptors.request.use((config) => {
  // Add Bearer token or other headers
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle logout or redirect to login
      console.error('Unauthorized, logging out...')
    }
    // Show error message
    return Promise.reject(error)
  }
)

export default axiosInstance