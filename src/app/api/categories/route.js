import connectDb from "@/lib/connectDb";
import Category from "@/models/Category";
import {
    handleBadRequest,
    handleSuccessResponse
} from "@/utils/api-response";

export async function GET(request) {
    await connectDb();
    try {
        const searchParams = Object.fromEntries(request.nextUrl.searchParams);
        const categories = await Category.find({ ...searchParams });
        if (!categories.length) {
            return handleBadRequest("No categories found");
        }

        return handleSuccessResponse(
            categories,
            "Categories fetched successfully",
        );
    } catch (error) {
        return handleBadRequest("Bad Request" + error.message);
    }
}
