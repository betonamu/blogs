import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        address: {
            type: String,
            default: "",
        },
        phoneNumber: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    { timestamps: true, collection: "users" },
);

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
