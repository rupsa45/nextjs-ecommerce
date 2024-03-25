
import { getDataFromToken } from "@/helper/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";



import { NextRequest,NextResponse } from "next/server";

dbConnect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await UserModel.findOne({ _id: userId }).select("-password");

        if (!user) {
            throw new Error("User not found");
        }

        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}