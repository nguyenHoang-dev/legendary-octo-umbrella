import { NextRequest, NextResponse } from 'next/server';
import { ActivityService } from '@/server/services/activity.service';
import { requireAuth } from '@/server/middleware/auth.middleware';
import { Role } from '@prisma/client';

const activityService = new ActivityService();
// Chỉ Admin và Giảng viên được tạo hoạt động
const authGuard = requireAuth([Role.ADMIN, Role.GIANG_VIEN]);

export async function POST(request: NextRequest) {
    const authResult = authGuard(request);
    if (!authResult.ok) {
        return authResult.response;
    }
    // const userPayload = authResult.payload; // Thông tin người tạo (có thể dùng sau)

    try {
        const data = await request.json();
        
        // Cần kiểm tra dữ liệu đầu vào (validation)
        if (!data.ten_hoat_dong || !data.id_hoc_ky || !data.id_tieu_chi) {
            return NextResponse.json({ message: 'Thiếu thông tin cần thiết.' }, { status: 400 });
        }

        const newActivity = await activityService.createActivity(data);

        return NextResponse.json({ 
            success: true, 
            message: 'Hoạt động đã được tạo thành công.', 
            activity: newActivity 
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Lỗi khi tạo hoạt động.', error: (error as Error).message }, { status: 500 });
    }
}
