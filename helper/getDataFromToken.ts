import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken= (request:NextRequest) =>{
    try {
        const token=request.cookies.get("token")?.value || " "
        if (!token) {
            throw new Error("Token not found in cookies");
        }
        const decoded:any=jwt.verify(token,process.env.TOKEN_SECRET!)
        if (!decoded.id) {
            throw new Error("Invalid token format: User ID not found");
        }
        return decoded.id
    } catch (error:any) {
        throw new Error(`Failed to decode token: ${error.message}`);
    }
}