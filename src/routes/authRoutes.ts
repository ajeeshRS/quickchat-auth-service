import express from "express"
import { login, resetPassword, sendOtp, signUp, verifyOtp } from "../controllers/authController"

const router = express.Router()


router.post("/signup", signUp)

router.post("/login", login)

router.post("/send-otp", sendOtp)

router.post("/verify-otp", verifyOtp)

router.post("/reset-password", resetPassword)



export default router