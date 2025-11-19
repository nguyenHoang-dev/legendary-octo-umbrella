import { NextRequest, NextResponse } from 'next/server';
import { StudentService } from '@/server/services/student.service';
import { requireAuth, JwtPayload } from '@/server/middleware/auth.middleware';
import { Role } from '@prisma/client';

const studentService = new StudentService();
// Endpoint này chỉ cho phép Sinh viên, Cán bộ lớp, Giảng viên/Admin truy cập
const authGuard = requireAuth([Role.SINH_VIEN, Role.CAN_BO_LOP, Role.GIANG_VIEN, Role.ADMIN]);

export async function GET(request: NextRequest, { params }: { params: { ma_sv: string } }) {
    
    const maSvParam = params.ma_sv;
    const searchParams = request.nextUrl.searchParams;
    const idHocKy = parseInt(searchParams.get('idHocKy') || '0');

    // 1. Xác thực và Phân quyền
    const authResult = authGuard(request);
    if (!authResult.ok) {
        return authResult.response;
    }
    const userPayload: JwtPayload = authResult.payload;

    // 2. Kiểm tra quyền truy cập dữ liệu
    // Sinh viên CHỈ được xem điểm của chính mình
    if (userPayload.role === Role.SINH_VIEN && userPayload.maSV !== maSvParam) {
        return NextResponse.json({ message: 'Không có quyền truy cập thông tin sinh viên khác.' }, { status: 403 });
    }

    try {
        if (!idHocKy) {
             // Trả về thông tin hồ sơ
             const profile = await studentService.getStudentProfile(maSvParam);
             if (!profile) return NextResponse.json({ message: 'Không tìm thấy sinh viên.' }, { status: 404 });
             return NextResponse.json(profile);
        } else {
             // Tính toán và trả về điểm rèn luyện
             const score = await studentService.calculateSemesterScore(maSvParam, idHocKy);
             return NextResponse.json(score);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi truy vấn điểm.', error: (error as Error).message }, { status: 500 });
    }
}
