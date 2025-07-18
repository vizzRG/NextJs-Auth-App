import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json()
    const {token} = reqbody;
    const user = await User.findOne({verifyToken: token, verifyTokenExpiry : {$gt: Date.now()}})

    if(!user){
        return NextResponse.json({message: "User Not Found", status: 400})
    }
     
    console.log(user)
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({message : "User Verfied Successfully", success: true})

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 400,
    });
  }
}
