import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true })

export const user = mongoose.model("User", userSchema)