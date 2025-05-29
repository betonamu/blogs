import { STORAGE_KEYS } from "@/constants";
import { removeCookie } from "./cookie";

export const logout = () => {
    removeCookie(STORAGE_KEYS.TOKEN);
};
