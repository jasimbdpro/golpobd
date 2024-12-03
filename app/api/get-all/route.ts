// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/lib/mongoose";
import User from "@/db/models/User";

export async function GET() {
    await connectToDatabase();

    try {
        // Fetch all documents in the User collection
        const users = await User.find({});

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error retrieving data:", error);
        return NextResponse.json({ success: false, message: "Failed to retrieve data" }, { status: 500 });
    }
}
