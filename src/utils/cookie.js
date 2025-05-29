import Cookie from "js-cookie";
import { ssrMode } from "@/constants";

const { cookies } = await import("next/headers");

export const getCookie = (name) => {
    if (ssrMode) {
        return cookies().then((cookieStore) => cookieStore.get(name)?.value);
    }
    return Cookie.get(name);
};

export const setCookie = (name, value, options) => {
    options = {
        ...options,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
    };
    if (ssrMode) {
        cookies().then((cookieStore) => cookieStore.set(name, value));
    }
    Cookie.set(name, value, options);
};

export const removeCookie = (name) => {
    if (ssrMode) {
        cookies().then((cookieStore) => cookieStore.delete(name));
    }
    Cookie.remove(name);
};
