import { HTTP_CODE } from "@/constants";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
        {
            success: false,
            message: message || "Unauthorized!",
            code: HTTP_CODE.UNAUTHORIZED,
        },
        {
            status: 401,
        },
    );
};
