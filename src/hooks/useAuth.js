import Cookies from "js-cookie";

import { STORAGE_KEYS } from "@/constants";
import { authStore } from "@/store/auth";

const useAuth = () => {
    const { user, setUser } = authStore();

    const logout = () => {
        setUser(null);
        Cookies.remove(STORAGE_KEYS.TOKEN);
    };

    return {
        user,
        isAuthenticated: Cookies.get(STORAGE_KEYS.TOKEN),
        logout,
    };
};

export default useAuth;
