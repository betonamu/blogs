import Cookie from "js-cookie";

import { ssrMode } from "@/constants";

let cookieStoreMemo = null;

const getServerCookies = async () => {
    if (!cookieStoreMemo) {
        const { cookies } = await import("next/headers");
        cookieStoreMemo = cookies();
    }
    return cookieStoreMemo;
};

export const getCookie = async (name) => {
    if (ssrMode) {
        const cookieStore = await getServerCookies();
        return cookieStore.get(name)?.value;
    }
    return Cookie.get(name);
};

export const setCookie = async (name, value, options = {}, { res } = {}) => {
    options = {
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        ...options,
        //httpOnly: true, // Set httpOnly to true for security (from server-side only)
    };

    if (ssrMode) {
        const cookieStore = await getServerCookies();
        if (res) {
            res.cookies.set(name, value, options);
        }

        cookieStore.set(name, value, options);
    } else {
        console.log({ name, value, options });
        Cookie.set(name, value, options);
    }
};

export const removeCookie = async (name) => {
    if (ssrMode) {
        const cookieStore = await getServerCookies();
        cookieStore.delete(name);
    } else {
        Cookie.remove(name);
    }
};
