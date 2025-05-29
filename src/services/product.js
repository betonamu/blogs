import { apiConfig } from "@/constants/apiConfig";
import fetcher from "@/utils/fetcher";

export const getProducts = async ({ params } = {}) => {
    try {
        return await fetcher(apiConfig.products.getList, { params });
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, message: error.message };
    }
};

export const getProductDetail = async ({ pathParams } = {}) => {
    try {
        return await fetcher(apiConfig.products.getDetail, { pathParams });
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return { success: false, message: error.message };
    }
}
