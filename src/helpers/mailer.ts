import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  //generate Hashed Token
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
  
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordToken: hashedToken,
        forgotpasswordExpiry: Date.now() + 360000,
      });
    }
  
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass:  process.env.MAILER_PASS,
      },
    });
  
    const mailOptions = {
      from: "vishal@gmail.com",
      to: email,
      subject:emailType === 'VERIFY'? "Email For Verification" : "Reset Password",
      html:`<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY'?`verifyemail?token=${hashedToken}`: `forgetpassword?token=${hashedToken}` }">here</a> to ${emailType==="VERIFY" ? "Email For Verification" : "Reset Password"} or Copy the URL
      <div>${process.env.DOMAIN}/${emailType === 'VERIFY'?`verifyemail?token=${hashedToken}`: `forgetpassword?token=${hashedToken}`} </div> </p>`
      }
    
  
    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error:any) {
        throw new Error(error.message)
  }
};
