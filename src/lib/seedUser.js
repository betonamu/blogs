import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "../models/User.js";

const MONGODB_URI = "mongodb://root:Anhquoc2020@localhost:27017/nextjs-mongodb?authSource=admin";
const seedUser = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Xóa dữ liệu cũ (tuỳ chọn)
    await User.deleteMany({});
    console.log("🧹 Cleared old data");

    // 2. Tạo người dùng
    const users = [
        {
            name: "admin",
            email: "admin@admin.com",
            password: "123456",
            role: "admin",
        },
        {
            name: "user",
            email: "user@user.com",
            password: "123456",
            role: "user",
        },
    ];

    for (const user of users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const newUser = new User({ ...user, password: hashedPassword });
        await newUser.save();
    }
    console.log("✅ Seeded users successfully");

    // 3. Đóng kết nối
    await mongoose.connection.close();
}

seedUser().catch((err) => {
    console.error("❌ Seeding failed:", err);
});