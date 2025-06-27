import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
    },
    isVerified : {
        type: Boolean, 
        default: false
    },
    isAdmin : {
        type: Boolean, 
        default: false
    },
    forgotpasswordToken: String,
    forgotpasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

let User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;