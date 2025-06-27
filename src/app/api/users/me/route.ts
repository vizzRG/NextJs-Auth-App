import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id:userId.id}).select("-password")

    return NextResponse.json({
        message : "User Found",
        data : user
    })
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
