import { NextResponse } from "next/server";

import { HTTP_CODE } from "@/constants";

export const handleBadRequest = (data, message, code = HTTP_CODE.BAD_REQUEST) => {
    return NextResponse.json(
        {
            success: false,
            data: data,
            message: message || "Bad Request!",
            code,
        },
        {
            status: 400,
        },
    );
};

export const handleInternalServerError = (message) => {
    return NextResponse.json(
        {
            success: false,
            message: message || "Internal Server Error!",
        },
        {
            status: 500,
        },
    );
};

export const handleSuccessResponse = (data, message) => {
    return NextResponse.json(
        {
            success: true,
            data,
            message: message || "Success!",
        },
        {
            status: 200,
        },
    );
};

export const handleFailedResponse = (data, message) => {
    return NextResponse.json(
        {
            success: false,
            data,
            message: message || "Failed!",
        },
        {
            status: 200,
        },
    );
};

export const handleUnAuthorizedResponse = (message, code) => {
    const response = NextResponse.json(
        {
            success: false,
            message: message || "Unauthorized!",
            code: code || HTTP_CODE.UNAUTHORIZED,
        },
        {
            status: 401,
        },
    );

    // setCookie(
    //     STORAGE_KEYS.TOKEN,
    //     "",
    //     {
    //         maxAge: 0,
    //     },
    //     { res: response },
    // );

    return response;
};
