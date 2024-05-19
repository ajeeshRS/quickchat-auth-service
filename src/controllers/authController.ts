import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { user } from "../models/userModel"
import axios from "axios"

export const signUp = async (req: Request, res: Response) => {
    try {

        const { userName, email, password } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json("All fields are mandatory")
        }
        const userData = {
            userName: userName,
            email: email
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user.create({
            userName,
            email,
            password: hashedPassword
        })
            .then(async () => {
                res.status(200).json("Signup success")
                await axios.post(`${process.env.USER_SERVICE_URL}/signup`, userData)

            })
            .catch((err) => {
                if (err.errorResponse.code === 11000) {
                    return res.status(400).json("User already exist !")
                } else {
                    return res.status(400).json("Couldn't signup")
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const login = async (req: Request, res: Response) => {

}


