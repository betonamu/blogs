import { API_URL } from ".";

export const METHOD = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
};

export const JSON_CONTENT_TYPE = "application/json";

export const HEADERS = {
    JSON: {
        "Content-Type": JSON_CONTENT_TYPE,
    },
    MULTIPART: {
        "Content-Type": "multipart/form-data",
    },
    FORM_URLENCODED: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export const apiConfig = {
    auth: {
        login: {
            url: `${API_URL}/api/auth/login`,
            method: "POST",
            headers: HEADERS.JSON,
        },
        google: {
            url: `${API_URL}/api/auth/google`,
            method: "POST",
            headers: HEADERS.JSON,
        },
        register: {
            url: `${API_URL}/api/auth/register`,
            method: "POST",
            headers: HEADERS.JSON,
        },
        logout: {
            url: `${API_URL}/api/auth/logout`,
            method: "GET",
            headers: HEADERS.JSON,
        },
    },
    account: {
        getProfile: {
            url: `${API_URL}/api/account`,
            method: "GET",
            headers: HEADERS.JSON,
        },
    },
    products: {
        getList: {
            url: `${API_URL}/api/products`,
            method: "GET",
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: `${API_URL}/api/products/:id`,
            method: "GET",
            headers: HEADERS.JSON,
        },
    },

    categories: {
        getList: {
            url: `${API_URL}/api/categories`,
            method: "GET",
            headers: HEADERS.JSON,
        },
        getBySlug: {
            url: `${API_URL}/api/categories/:slug`,
            method: "GET",
            headers: HEADERS.JSON,
        },
    },
};
