import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:11984",
    withCredentials: true
})

export default api