import axios from "axios";


export const userServiceApi = axios.create({
    baseURL: process.env.USER_SERVICE_URL
})

export const chatServiceApi = axios.create({
    baseURL: process.env.CHAT_SERVICE_URL
})