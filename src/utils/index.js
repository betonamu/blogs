import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...cls) {
    return twMerge(classNames(...cls));
}

export const generatePath = (fullUrl, params = {}) => {
    const url = new URL(fullUrl);
    url.pathname = url.pathname.replace(/:(\w+)/g, (_, key) => params[key] || `:${key}`);
    return url.toString();
};
