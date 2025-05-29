import { withAuth } from "@/hocs/withAuth";
import connectDb from "@/lib/connectDb";
import User from "@/models/User";
import { handleBadRequest, handleSuccessResponse } from "@/utils/api-response";

export const GET = withAuth(
    async (request, { payload }) => {
        await connectDb();
        try {
            console.log({ payload });
            console.log({ id: payload._id });

            const user = await User.findById(payload._id);
            if (!user) {
                return handleBadRequest("User not found");
            }
            const dto = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                phoneNumber: user.phoneNumber,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };

            return handleSuccessResponse(dto, "User fetched successfully");
        } catch (error) {
            return handleBadRequest("Bad Request" + error.message);
        }
    },
    ["user"],
);
