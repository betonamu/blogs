import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...cls) {
    return twMerge(classNames(...cls));
}
