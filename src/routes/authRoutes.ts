import express from "express"
import { login, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/authController"
import rateLimit from "express-rate-limit"

const router = express.Router()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

router.post("/signup", signUp)

router.post("/login", login)

router.post("/send-otp", sendOtp)

router.post("/verify-otp", limiter, verifyOtp)

router.post("/reset-password", resetPassword)



export default router