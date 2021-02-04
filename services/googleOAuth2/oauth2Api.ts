import axios from "axios";

const api = axios.create({
    baseURL: "https://oauth2.googleapis.com/"
})

export default api