import { apiConfig } from "@/constants/apiConfig";
import fetcher from "@/utils/fetcher";

export const getProfile = async () => {
    try {
        return await fetcher(apiConfig.account.getProfile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { success: false, message: error.message };
    }
};
