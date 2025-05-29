import { apiConfig } from "@/constants/apiConfig";
import fetcher from "@/utils/fetcher";

export const getCategories = async ({ params } = {}) => {
    try {
        return await fetcher(apiConfig.categories.getList, { params });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return {
            success: false,
            data: null,
            message: error.message,
        };
    }
};

export const getCategoryBySlug = async ({ pathParams }) => {
    try {
        return await fetcher(apiConfig.categories.getBySlug, { pathParams });
    } catch (error) {
        console.error("Error fetching category by slug:", error);
        return {
            success: false,
            data: null,
            message: error.message,
        };
    }
};
