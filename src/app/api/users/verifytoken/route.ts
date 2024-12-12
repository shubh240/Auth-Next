import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token, "TOKEN");

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: new Date() } })

        if (!user) {
            return NextResponse.json({ error: "Invalid token!", code: 0 }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
    } catch (error: any) {
        console.log("Eror: ", error);
        return NextResponse.json({ code: 0, error: error.message }, { status: 500 });

    }
} 