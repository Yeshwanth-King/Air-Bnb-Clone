import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
}, {})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User