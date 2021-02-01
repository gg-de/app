import Constants from "expo-constants";
import axios from "axios";

const { manifest } = Constants;

const apiUrl = `http://${manifest.debuggerHost
    .split(":")
    .shift()}:8000/`;

const api = axios.create({
    baseURL: apiUrl
})

export default api
