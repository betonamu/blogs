import connectDb from "@/lib/connectDb";
import Category from "@/models/Category";
import {
    handleBadRequest,
    handleSuccessResponse
} from "@/utils/api-response";

export async function GET(request, { params }) {
    const { slug } = await params;
    await connectDb();
    try {
        const categories = await Category.findOne({ slug });
        if (!categories) {
            return handleBadRequest("No category found with slug: " + slug);
        }

        return handleSuccessResponse(categories, "Categories fetched successfully");
    } catch (error) {
        return handleBadRequest("Bad Request" + error.message);
    }
}
