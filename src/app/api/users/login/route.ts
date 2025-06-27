import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;

        //If user Exist
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({message : "User not Found", status : 400})
        }

        //If password Correct
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({message : "Invalid Password", status : 400})
        }

        //create tokenData
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"}
        )
        
        const response = NextResponse.json({
            message : "Login Successful",
            success : true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}