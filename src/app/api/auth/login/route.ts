
import { NextResponse } from 'next/server';
import { AuthService } from '@/server/services/auth.service'; // Giả sử service nằm ở đây

// Khởi tạo service (để sử dụng lại)
const authService = new AuthService();

// Hàm xử lý HTTP POST request
export async function POST(request: Request) {
    try {
        // 1. Lấy dữ liệu tên đăng nhập và mật khẩu từ body request
        const { tenDangNhap, matKhau } = await request.json();

        // 2. Kiểm tra dữ liệu đầu vào cơ bản
        if (!tenDangNhap || !matKhau) {
            return NextResponse.json(
                { message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu.' }, 
                { status: 400 } // Bad Request
            );
        }

        // 3. Gọi Core Logic Service (Xử lý đăng nhập, so sánh hash, tạo JWT)
        const result = await authService.login(tenDangNhap, matKhau);

        // 4. Trả về JWT Token và thông tin user nếu thành công
        return NextResponse.json({
            success: true,
            message: 'Đăng nhập thành công!',
            data: result, // Chứa { token, user }
        });

    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        
        // Xử lý lỗi nghiệp vụ (ví dụ: sai mật khẩu)
        if (error instanceof Error && error.message.includes('không đúng')) {
             return NextResponse.json(
                { message: error.message }, 
                { status: 401 } // Unauthorized
            );
        }
        
        // Xử lý lỗi server chung
        return NextResponse.json(
            { message: 'Lỗi máy chủ nội bộ trong quá trình xử lý đăng nhập.' }, 
            { status: 500 }
        );
    }
}