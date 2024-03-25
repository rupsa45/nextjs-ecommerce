
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'


dbConnect()


export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {name,email,password} =reqBody
        //validation
        console.log(reqBody);
        
        //check if user already exists
        const user =await UserModel.findOne({email})
        if(user){
            return NextResponse.json({error : "User already  exists"},{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt)
        const newUser=new UserModel({
            name,
            email,
            password:hashPassword
        })
        const savedUser=await  newUser.save()
        console.log(savedUser);

        //sendVerifaction mail
        await  sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
            message:"User  created successfully" ,
            success:true,
            savedUser
        })
        
    } catch (error:any) {
       return NextResponse.json(
        {error:error.message},
        {status:500}
       ) 
    }
}