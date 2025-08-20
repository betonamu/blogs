import { jwtVerify } from "jose";

import { STORAGE_KEYS } from "@/constants";
import { handleUnAuthorizedResponse } from "@/utils/api-response";
import { removeCookie } from "@/utils/cookie";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Danh sách API không cần auth
const publicRoutes = ["/api/public", "/api/auth/login"];

function isPublicRoute(url) {
    return publicRoutes.some((path) => url.startsWith(path));
}

export function withAuth(handler, roles = []) {
    return async (request, options) => {
        const { pathname } = new URL(request.url);

        // Bỏ qua nếu là route public
        if (isPublicRoute(pathname)) {
            return handler(request, options, null); // cho phép không cần user
        }

        // Lấy token từ header hoặc cookie
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        if (!token) {
            return handleUnAuthorizedResponse("No token provided");
        }

        try {
            const { payload } = await jwtVerify(token, secret);
            if (roles.length && !roles.includes(payload.role)) {
                return handleUnAuthorizedResponse("Unauthorized");
            }
            return handler(request, { ...options, payload });
        } catch (e) {
            removeCookie(STORAGE_KEYS.TOKEN);
            return handleUnAuthorizedResponse("Invalid or expired token", e);
        }
    };
}
