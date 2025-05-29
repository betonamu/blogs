import mongoose from "mongoose";

import { DEFAULT_PAGING } from "@/constants";
import connectDb from "@/lib/connectDb";
import _Category from "@/models/Category";
import Product from "@/models/Product";
import { handleBadRequest, handleSuccessResponse } from "@/utils/api-response";

void _Category;

export const GET = async (request, { params }) => {
    await connectDb();
    try {
        const searchParams = Object.fromEntries(request.nextUrl.searchParams);
        const { categoryId } = searchParams;
        const page = parseInt(searchParams.page) || DEFAULT_PAGING.PAGE;
        const size = parseInt(searchParams.size) || DEFAULT_PAGING.SIZE;
        const skip = (page - 1) * size;

        const query = {};
        if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
            query.productCategory = categoryId;
        }

        // Tổng số sản phẩm
        const total = await Product.countDocuments();

        // Lấy dữ liệu phân trang
        const data = await Product.find({ ...query })
            .populate({
                path: "productCategory",
                select: "name slug _id",
            })
            .skip(skip)
            .limit(size)
            .exec();

        const dto = {
            total,
            page,
            size,
        };
        if (!data.length) {
            dto.contents = null;
            return handleBadRequest(dto, "No products found.");
        }
        dto.contents = data;
        return handleSuccessResponse(dto, "Get all products successfully.");
    } catch (error) {
        return handleBadRequest("Bad Request" + error.message);
    }
};
