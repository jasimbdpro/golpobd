// lib/mongoose.ts
import mongoose from "mongoose";
const URI = process.env.URI || "";
export async function connectToDatabase() {
    if (!mongoose.connection.readyState) {
        mongoose.connect(URI)
            .then(() => {
                console.log("DB connected successfully");
            })
            .catch((err) => {
                console.error("DB connection error:", err);
            });
    }
}
