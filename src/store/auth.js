import Cookies from "js-cookie";
import { create } from "zustand";

import { STORAGE_KEYS } from "@/constants";

export const authStore = create((set) => ({
    user: null,
    isAuthenticated: !!Cookies.get(STORAGE_KEYS.TOKEN),
    setUser: (user) => set({ user }),
    logout: () => {
        set({ user: null });
        Cookies.remove(STORAGE_KEYS.TOKEN);
    },
}));
