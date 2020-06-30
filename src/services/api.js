import axios from "axios"

const api = axios.create({
    baseURL: 'https://api.edulibras.com.br'
})

export default api