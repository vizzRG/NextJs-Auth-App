import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found", status: 400 });
    }

    await sendEmail({email: email, emailType: "RESET", userId : user._id})

    return NextResponse.json(
      { message: "User password update link sent" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
}
