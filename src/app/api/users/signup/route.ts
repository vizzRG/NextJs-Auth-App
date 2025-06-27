import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    //Check if user Already Existed
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already Exist" },
        { status: 400 }
      );
    }

    // hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    //verification Email
    await sendEmail({email:email, emailType : "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
