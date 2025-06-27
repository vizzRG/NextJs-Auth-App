import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { password, confirmPassword,token } = reqbody;
    console.log(token)
    console.log(password)
    const user = await User.findOne({
      forgotpasswordToken: token,
      forgotpasswordExpiry: { $gt: Date.now() },
    });
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "User Not Found", status: 400 });
    }
    console.log(user);

    if (password == confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.forgotpasswordToken = undefined;
      user.forgotpasswordExpiry = undefined;
    } else {
      return NextResponse.json({
        message: "Password & confirmPassword are different",
        status: 400,
      });
    }

    await user.save();

    return NextResponse.json({
      message: "Password Changed Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 400,
    });
  }
}
