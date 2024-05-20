import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { user } from "../models/userModel"
import axios from "axios"
import jwt from "jsonwebtoken"

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

    try {
        const jwtSecret: string = process.env.JWT_SECRET as string

        const { email, password, googleId } = req.body
        if (!email || (!password && !googleId)) {
            return res.status(400).json("All fields are mandatory")
        }

        const existingUser = await user.findOne({ email: email })

        if (!existingUser) {
            return res.status(404).json("User not found")
        }

        let match;
        if (existingUser.password) {
            match = await bcrypt.compare(password, existingUser.password)
        }

        if (existingUser && (match || googleId === existingUser.googleId)) {

            const token = jwt.sign({
                user: {
                    email: existingUser.email
                }
            }, jwtSecret, { expiresIn: '3d' })

            res.status(200).json({ message: "Login success", token: token })
        } else {
            return res.status(401).json("Invalid credentials")
        }

    } catch (err) {
        console.error("Error in login", err)
        res.status(500).json("Couldn't login")
    }
}


