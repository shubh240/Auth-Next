import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}


export const getDataFromToken = (request: NextRequest): JwtPayload => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            throw new Error("No token found");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

        console.log("DECODED =================>", decodedToken);


        return decodedToken;
    } catch (error: any) {
        console.log(error, "Error getting in get data from token");

        throw new Error(error.message);
    }
}