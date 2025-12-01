import { NextRequest, NextResponse } from 'next/server';
import { ActivityService } from '@/server/services/activity.service';
import { requireAuth } from '@/server/middleware/auth.middleware';
import { Role } from '@prisma/client';

const activityService = new ActivityService();

// Chỉ Admin, Giảng viên, Cán bộ lớp được duyệt điểm
const authGuard = requireAuth([Role.ADMIN, Role.GIANG_VIEN, Role.CAN_BO_LOP]);

export async function PUT(request: NextRequest, { params }: { params: { id_tham_gia: string } }) {
    
    const idThamGia = parseInt(params.id_tham_gia);

    // 1. Xác thực và Phân quyền (Authorization)
    const authResult = authGuard(request);
    if (!authResult.ok) {
        return authResult.response; // Trả về lỗi 401/403
    }
    // const userPayload = authResult.payload; // Thông tin người duyệt

    try {
        const { trang_thai, diem_dat_duoc } = await request.json();

        if (!['DA_DUYET', 'TU_CHOI'].includes(trang_thai) || isNaN(idThamGia)) {
            return NextResponse.json({ message: 'Dữ liệu đầu vào không hợp lệ.' }, { status: 400 });
        }
        
        // 2. Gọi Service để thực hiện logic duyệt điểm
        const reviewResult = await activityService.reviewParticipation(
            idThamGia,
            trang_thai,
            diem_dat_duoc
        );

        return NextResponse.json({ 
            success: true, 
            message: `Yêu cầu tham gia #${idThamGia} đã được cập nhật thành ${trang_thai}.`,
            reviewResult 
        });

    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi duyệt tham gia.', error: (error as Error).message }, { status: 500 });
    }
}