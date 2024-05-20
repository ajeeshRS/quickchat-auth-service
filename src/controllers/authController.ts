import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { user } from "../models/userModel"
import axios from "axios"

export const signUp = async (req: Request, res: Response) => {
    try {

        const { userName, email, password, googleId } = req.body

        if (!userName || !email || (!password && !googleId)) {
            return res.status(400).json("All fields are mandatory")
        }

        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(400).json("User already exists!")
        }

        // hash the password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10)
        }

        const userData = {
            userName,
            email,
            password: hashedPassword,
            ...(googleId && { googleId })
        }

        await user.create(userData)

        // for sending to user service
        const userProfileData = {
            userName: userName,
            email: email,
            googleId: googleId
        }
        try {
            await axios.post(`${process.env.USER_SERVICE_URL}/signup`, userProfileData)

        } catch (profileErr) {
            console.error('Error creating profile', profileErr)
            return res.status(500).json("Error creating in user profile")
        }

        res.status(201).json("Signup success")

    } catch (err) {
        console.error("Error in signing up", err)
        return res.status(500).json("Couldn't signup")
    }
}

export const login = async (req: Request, res: Response) => {

}


