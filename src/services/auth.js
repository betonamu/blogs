import { apiConfig } from "@/constants/apiConfig";
import fetcher from "@/utils/fetcher";

export const login = async (data) => {
    try {
        return await fetcher(apiConfig.auth.login, { data });
    } catch (error) {
        console.error("Error logging in:", error);
        return { success: false, message: error.message };
    }
};

export const googleLogin = async (data) => {
    try {
        return await fetcher(apiConfig.auth.google, { data });
    } catch (error) {
        console.error("Error logging in with Google:", error);
        return { success: false, message: error.message };
    }
};
