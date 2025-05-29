import { API_URL } from ".";

const baseHeader = {
    "Content-Type": "application/json",
};

const multipartFormHeader = {
    "Content-Type": "multipart/form-data",
};

export const apiConfig = {
    auth: {
        login: {
            url: `${API_URL}/api/auth/login`,
            method: "POST",
            headers: baseHeader,
        },
        register: {
            url: `${API_URL}/api/auth/register`,
            method: "POST",
            headers: baseHeader,
        },
        logout: {
            url: `${API_URL}/api/auth/logout`,
            method: "GET",
            headers: baseHeader,
        },
    },
    account: {
        getProfile: {
            url: `${API_URL}/api/account`,
            method: "GET",
            headers: baseHeader,
        },
    },
    products: {
        getList: {
            url: `${API_URL}/api/products`,
            method: "GET",
            headers: baseHeader,
        },
        getDetail: {
            url: `${API_URL}/api/products/:id`,
            method: "GET",
            headers: baseHeader,
        },
    },

    categories: {
        getList: {
            url: `${API_URL}/api/categories`,
            method: "GET",
            headers: baseHeader,
        },
        getBySlug: {
            url: `${API_URL}/api/categories/:slug`,
            method: "GET",
            headers: baseHeader,
        },
    },
};
