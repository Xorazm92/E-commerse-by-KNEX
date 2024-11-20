import mongoose from "mongoose"

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], default: 'User' },
    avatar: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    birth_of_date: {
        type: Date,
        default: '2024-04-06'
    },
    phone_number: {
        type: String,
        unique: true,
        require: true
    },
    is_active: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})


export const Users = mongoose.model("users", usersSchema)