import bcrypt from "bcryptjs";
import Joi from "joi";
import { SignJWT } from "jose";

import connectDb from "@/lib/connectDb";
import User from "@/models/User";
import { handleBadRequest, handleSuccessResponse } from "@/utils/api-response";

const schemas = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const expiresInSeconds = parseInt(process.env.JWT_EXPIRES_IN?.match(/\d+/)?.[0] * 24 * 60 * 60 || "3600");

export async function POST(request) {
    await connectDb();

    try {
        const { email, password } = await request.json();
        const { error } = Joi.object(schemas).validate({ email, password });

        if (error) {
            return handleBadRequest(error.details[0].message);
        }

        const user = await User.findOne({ email });
        if (!user) {
            return handleBadRequest("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return handleBadRequest("Incorrect password");
        }

        // ✅ Generate JWT token with jose
        const token = await new SignJWT({
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(`${expiresInSeconds}s`)
            .sign(secret);

        const dto = {
            token,
            type: "Bearer",
            expiredIn: expiresInSeconds,
        };

        return handleSuccessResponse(dto, "Login successfully");
    } catch (error) {
        console.error("Error in login:", error);
        return handleBadRequest("Bad Request " + error.message);
    }
}
