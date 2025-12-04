import prisma from './prisma.service';
import { HoatDong, ThamGia } from '@prisma/client';

// Định nghĩa kiểu dữ liệu cho việc tạo hoạt động mới
interface CreateActivityData {
    ten_hoat_dong: string;
    diem_du_kien: number;
    id_tieu_chi: number;
    id_hoc_ky: number;
}

export class ActivityService {

    // Tạo Hoạt động mới (Chỉ dành cho ADMIN/GIANG_VIEN)
    public async createActivity(data: CreateActivityData): Promise<HoatDong> {
        return prisma.hoatDong.create({ data });
    }

    // Ghi nhận sinh viên tham gia hoạt động (Sinh viên tự đăng ký)
    public async submitParticipation(maSv: string, idHoatDong: number, minhChung?: string): Promise<ThamGia> {
        // Lấy điểm dự kiến từ HoatDong
        const activity = await prisma.hoatDong.findUnique({
            where: { id_hoat_dong: idHoatDong },
            select: { diem_du_kien: true }
        });

        if (!activity) {
            throw new Error('Hoạt động không tồn tại.');
        }

        // Tạo yêu cầu tham gia với trạng thái 'cho_duyet'
        return prisma.thamGia.create({
            data: {
                ma_sv: maSv,
                id_hoat_dong: idHoatDong,
                diem_dat_duoc: activity.diem_du_kien, // Điểm dự kiến ban đầu
                ngay_ghi_nhan: new Date(),
                minh_chung: minhChung,
                trang_thai: 'CHO_DUYET',
            }
        });
    }

    // Duyệt điểm tham gia (Chỉ dành cho ADMIN/GIANG_VIEN/CAN_BO_LOP)
    public async reviewParticipation(idThamGia: number, newStatus: 'DA_DUYET' | 'TU_CHOI', actualScore?: number): Promise<ThamGia> {
        
        // Cập nhật trạng thái và điểm thực tế (nếu có)
        const data: Partial<ThamGia> = { trang_thai: newStatus };
        if (newStatus === 'DA_DUYET' && actualScore !== undefined) {
            data.diem_dat_duoc = actualScore;
        }

        return prisma.thamGia.update({
            where: { id_tham_gia: idThamGia },
            data: data as any, // Ép kiểu vì Prisma chỉ chấp nhận các trường đã định nghĩa
        });
    }
}
