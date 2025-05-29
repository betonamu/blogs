import qs from "qs";

import { getCookie } from "./cookie";
import { STORAGE_KEYS } from "@/constants";
import { authStore } from "@/store/auth";

const fetcher = async (apiConfig, { data, params, pathParams = {} } = {}) => {
    const { logout } = authStore.getState();
    const { url, ...options } = apiConfig;
    let fullPath = url;

    if (!options.isPublic) {
        const token = await getCookie(STORAGE_KEYS.TOKEN);
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    if (pathParams) {
        Object.keys(pathParams).forEach((key) => {
            fullPath = fullPath.replace(`/:${key}`, `/${pathParams[key]}`);
        });
    }

    if (apiConfig.method === "GET") {
        if (params) {
            const query = qs.stringify(params);
            fullPath += "?" + query;
        }
    } else {
        if (data) {
            options.body = JSON.stringify(data);
        }
    }

    const res = await fetch(fullPath, options);

    if (res.status === 401) {
        logout();
    }

    return await res.json();
};

export default fetcher;
