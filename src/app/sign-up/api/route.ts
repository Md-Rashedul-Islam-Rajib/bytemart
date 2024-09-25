import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request:Request) => {
    const user = await request.json();
    try {
        const db = await connectDB();
        const userCollection = db?.collection("users");
        const exist = userCollection?.findOne({email:user?.email});
        if(exist){
            return NextResponse.json({message: "User already exists"},{status: 304});
        }
        await userCollection?.insertOne(user);
        return NextResponse.json({message: "User Created"},{status:201});
    } catch (error:unknown) {
        if(error instanceof Error){
            console.error("Error occurred:",error.message);
            return NextResponse.json({message: "Internal Server Error"},{status:500});
        }
        return NextResponse.json({message: "Unknown error"},{status:500});
    }
}