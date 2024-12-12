import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {

        const { userId } = getDataFromToken(request);

        console.log("UserId object :", userId);


        const user = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json({
            message: 'Data found',
            data: user
        });

    } catch (error: any) {
        console.log("Error in get user details from token: ", error);

        return NextResponse.json({ code: 0, error: error.message });
    }
}



