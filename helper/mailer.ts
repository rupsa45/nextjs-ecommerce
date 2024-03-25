
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import UserModel from '@/lib/models/UserModel'
export const sendEmail = async({email,emailType,userId}:any)=>
{
  try {
    const hashToken=await bcryptjs.hash(userId.toString(),10)

    if(emailType ==="VERIFY"){
      await UserModel.findByIdAndUpdate(userId,{verifyToken: hashToken,verifyTokenExpiry:Date.now() + 3600000})
    }
    else if (emailType==='RESET'){
      await UserModel.findByIdAndUpdate(userId,{forgotPasswordToken:hashToken,forgotPasswordTokenExpiry:Date.now()+3600000})
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5c009b830cb600",
        pass: "77f135e157cac0"
      }
    });

    const mailOption = {
      from: 'rupsa@rupsa.ai', 
      to: email, 
      subject: emailType == 'VERIFY' ? "Verify your mail" : "Reset yor mail", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
      </p>`, 
    }

    const mailResponse = await transport.sendMail(mailOption)
    return mailResponse

  } catch (error:any) {
    throw new Error(error.message)
  }
}