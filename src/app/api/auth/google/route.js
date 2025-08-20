import { OAuth2Client } from "google-auth-library";
import Joi from "joi";
import { SignJWT } from "jose";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/constants";
import connectDb from "@/lib/connectDb";
import User from "@/models/User";
import { handleBadRequest, handleSuccessResponse } from "@/utils/api-response";

const schemas = {
    code: Joi.string().required(),
};

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "postmessage");
const expiresInSeconds = parseInt(process.env.JWT_EXPIRES_IN?.match(/\d+/)?.[0] * 24 * 60 * 60 || "3600");
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
    await connectDb();

    try {
        const { code } = await request.json();
        const { error } = Joi.object(schemas).validate({ code });
        if (error) {
            return handleBadRequest(error.details[0].message);
        }

        console.log({ code });
        const { tokens } = await client.getToken(code);
        console.log({ tokens });

        const idToken = tokens.id_token;
        if (!idToken) {
            return handleBadRequest("Invalid Google token");
        }
        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, picture } = payload;

        // ✅ Tìm hoặc tạo user trong DB
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name: name,
                avatar: picture,
                provider: "google",
                role: "user", // 👈 hoặc bất kỳ giá trị mặc định nào bạn muốn
            });
        }

        // ✅ Generate JWT token with jose
        const accessToken = await new SignJWT({
            _id: user._id.toString(),
            email,
            name,
            picture,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime(`${expiresInSeconds}s`)
            .sign(secret);

        const dto = {
            token: accessToken,
            type: "Bearer",
            expiredIn: expiresInSeconds,
            email,
            name,
            picture,
        };

        return handleSuccessResponse(dto, "Login successfully");
    } catch (error) {
        console.log({ error });

        return handleBadRequest("Bad Request " + error);
    }
}
