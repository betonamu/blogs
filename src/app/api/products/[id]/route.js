import connectDb from "@/lib/connectDb";
import Product from "@/models/Product";
import ProductVariant from "@/models/ProductVariant";
import {
    handleBadRequest,
    handleSuccessResponse
} from "@/utils/api-response";

void ProductVariant;

export async function GET(request, { params }) {
    const { id } = await params;
    console.log("Fetching product with id:", id);
    
    await connectDb();
    try {
        const product = await Product.findById(id).populate({ path: "variants" }).populate({
            path: "productCategory",
            select: "name slug _id", // chỉ lấy các trường cần thiết
        });
        if (!product) {
            return handleBadRequest("No product found with id: " + id);
        }

        return handleSuccessResponse(product, "Product fetched successfully");
    } catch (error) {
        return handleBadRequest("Bad Request" + error.message);
    }
}
