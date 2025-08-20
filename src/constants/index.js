export const ssrMode = typeof window === "undefined";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const GOOGLE_CLIENT_ID = process.env.NEXT_GOOGLE_OAUTH_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.NEXT_GOOGLE_OAUTH_CLIENT_SECRET;

export const AUTHENTICATE = {
    REQUIRED: "REQUIRE", // must be logged in to access the route
    NOT_REQUIRED: "NOT_REQUIRED", // not be logged in to access the route
    BOTH: "BOTH", // can access the route regardless of logged in or not
};

export const DEFAULT_PAGING = {
    PAGE: 1,
    SIZE: 10,
};

export const STORAGE_KEYS = {
    TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
};

export const HTTP_CODE = {
    UNAUTHORIZED: "UNAUTHORIZED",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
};
