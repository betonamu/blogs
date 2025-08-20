import qs from "qs";

import { STORAGE_KEYS } from "@/constants";
import { HEADERS, JSON_CONTENT_TYPE } from "@/constants/apiConfig";
import { authStore } from "@/store/auth";
import { generatePath } from "@/utils";
import { getCookie } from "@/utils/cookie";

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

    // Replace path parameters in the URL
    fullPath = generatePath(fullPath, pathParams);
    console.log({fullPath, pathParams});
    

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

    const contentType = res.headers.get("content-type");
    if (contentType?.includes(JSON_CONTENT_TYPE)) {
        return await res.json();
    }

    return res;
};

export default fetcher;
