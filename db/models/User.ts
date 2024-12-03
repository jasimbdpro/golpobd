// models/User.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const User = models.doya01 || model("doya01", userSchema);

export default User;
