import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
// Import kiểu cho Role từ Prisma
import { Role } from '@prisma/client'; 


const JWT_SECRET = process.env.JWT_SECRET || 'FALLBACK_SECRET_KEY_NEVER_USE_IN_PROD';

// Định nghĩa kiểu dữ liệu cho Payload (thông tin chứa trong JWT)
export interface JwtPayload {
    id: number;
    username: string;
    role: Role; 
    maSV?: string;
    exp: number; 
    iat: number; 
}

export function verifyToken(request: NextRequest): { success: boolean, payload: JwtPayload | null, message?: string } {
    
    // 1. Lấy token từ header Authorization
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { success: false, message: 'Thiếu token xác thực.', payload: null };
    }

    const token = authHeader.split(' ')[1];

    try {
        // 2. Xác thực Token (Verify)
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        
        // 3. Kiểm tra Token hết hạn (Thường jwt.verify tự xử lý, nhưng nên kiểm tra lại)
        if (decoded.exp * 1000 < Date.now()) {
            return { success: false, message: 'Token đã hết hạn.', payload: null };
        }

        return { success: true, payload: decoded };
        
    } catch (error) {
        // Lỗi xác thực hoặc hết hạn
        return { success: false, message: 'Token không hợp lệ.', payload: null };
    }
}


/**
 * Middleware phân quyền (Áp dụng trong các route.ts)
 * @param allowedRoles: Mảng các Role được phép truy cập endpoint này
 */
export type AuthGuardSuccess = { ok: true; payload: JwtPayload };
export type AuthGuardFailure = { ok: false; response: NextResponse };
export type AuthGuardResult = AuthGuardSuccess | AuthGuardFailure;

export function requireAuth(allowedRoles: Role[]) {
    return (request: NextRequest): AuthGuardResult => {
        const result = verifyToken(request);

        if (!result.success || !result.payload) {
            // Trả về response lỗi 401 nếu xác thực thất bại
            return { ok: false, response: NextResponse.json({ message: result.message || 'Không được phép truy cập.' }, { status: 401 }) };
        }

        const userRole = result.payload.role;

        // 4. Phân quyền (Authorization)
        if (!allowedRoles.includes(userRole)) {
            // Trả về response lỗi 403 nếu không có quyền
            return { ok: false, response: NextResponse.json({ message: 'Quyền hạn không đủ để thực hiện hành động này.' }, { status: 403 }) };
        }
        
        // Nếu thành công, trả về Payload để route.ts có thể sử dụng thông tin user
        return { ok: true, payload: result.payload };
    };
}