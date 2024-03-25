
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

dbConnect()

export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if the user exist or not
        const user =await UserModel.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"},{status:400});
        }

        //check if the user is correct or not 
        const validPassword =await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return  NextResponse.json({error:"Invalid Password!"},{status:400})
        }
        //generate a token  data
        const tokenData={
            id:user._id,
            name:user.name,
            email:user.email
        }

        //create token 
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn:"1hr"})

        const response = NextResponse.json({
            message:"Login successfully",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}