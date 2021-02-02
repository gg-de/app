import axios from "axios";

const api = axios.create({
    baseURL: "https://classroom.googleapis.com/v1/"
})

export default api