import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log("REq BODY: ", reqBody);


        // check if user exist or not

        const user = await User.findOne({ email: email });

        console.log(user, "Usererrerge");


        if (!user) {
            return NextResponse.json({ code: 0, error: "User doesn't exist" }, { status: 400 });
        }

        // check if password is correct
        const validatePassword = await bcryptjs.compare(password, user.password);

        console.log(validatePassword, "Validat");


        if (!validatePassword) {
            return NextResponse.json({ code: 0, error: "Invalid password!" }, { status: 400 })
        }

        // create token data
        const tokenData = { userId: user._id, username: user.username, password: user.password };

        // generate token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "User Login successfully",
            success: true
        }, { status: 200 });

        response.cookies.set("token", token, { httpOnly: true, });

        return response;

    } catch (error: any) {
        console.log(error, "Error");

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}