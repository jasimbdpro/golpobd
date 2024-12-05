import { NextResponse } from 'next/server';
import mongoose, { Schema, models, model } from 'mongoose';
import filter from "leo-profanity";
import bannedWords from './banned-words-base64.js'
filter.add(bannedWords);
const URI = process.env.URI || "";

// Define the schema and model, ensuring no duplicate definitions
const userSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const userModel = models.doya01 || model("doya01", userSchema);

// Connect to MongoDB only if not already connected
if (!mongoose.connection.readyState) {
    mongoose.connect(URI)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((err) => {
            console.error("DB connection error:", err);
        });
}

export async function POST(request: Request) {
    try {
        const { title, content }: { title: string; content: string } = await request.json();

        // Validate input data
        if (!title || !content) {
            return NextResponse.json({ success: false, message: "Title and content are required" }, { status: 400 });
        }

        // Save data to MongoDB
        const newUser = new userModel({ title: filter.clean(title), content: filter.clean(content) });
        await newUser.save();

        console.log("Data saved to MongoDB:", { title, content });
        return NextResponse.json({ success: true, message: "Data saved successfully", data: { title, content } });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ success: false, message: "Failed to save data" }, { status: 500 });
    }
}
