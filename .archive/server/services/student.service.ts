import prisma from './prisma.service';
import { DiemRenLuyen, SinhVien } from '@prisma/client';

export class StudentService {
    // Trả về hồ sơ sinh viên
    public async getStudentProfile(maSv: string): Promise<SinhVien | null> {
        return prisma.sinhVien.findUnique({ where: { ma_sv: maSv } });
    }

    // Tính điểm rèn luyện tích lũy theo học kỳ, giới hạn bởi ngưỡng cấu hình
    public async calculateSemesterScore(maSv: string, idHocKy: number): Promise<DiemRenLuyen> {
        type Config = { id_loai_tc: number; diem_toi_da: number };

        // 1. Lấy tất cả ngưỡng điểm tối đa cho học kỳ này
        const configs: Config[] = await prisma.cauHinhDiem.findMany({
            where: { id_hoc_ky: idHocKy },
            select: { id_loai_tc: true, diem_toi_da: true }
        });

        // Tạo map để tra cứu ngưỡng nhanh chóng: { id_loai_tc: diem_toi_da }
        const maxScoreMap = new Map<number, number>(configs.map((c: Config) => [c.id_loai_tc, c.diem_toi_da]));

        // 2. Lấy tất cả điểm đã được DUYỆT, kèm theo Loại tiêu chí (qua Hoạt động và Tiêu chí)
        const participationDetails = await prisma.thamGia.findMany({
            where: {
                ma_sv: maSv,
                trang_thai: 'DA_DUYET',
                hoat_dong: {
                    id_hoc_ky: idHocKy
                }
            },
            include: {
                hoat_dong: {
                    select: {
                        diem_du_kien: true, // Điểm dự kiến
                        tieu_chi: {
                            select: {
                                id_loai_tc: true // Lấy Loại tiêu chí
                            }
                        }
                    }
                }
            }
        });

        // 3. Tính điểm tích lũy theo từng loại tiêu chí và áp dụng ngưỡng
        let finalTotalScore = 0;
        const scoresByType = new Map<number, number>(); // { id_loai_tc: total_score }

        for (const p of participationDetails) {
            const idLoaiTc = p.hoat_dong.tieu_chi.id_loai_tc;
            const diemDatDuoc = p.diem_dat_duoc;

            // Cộng dồn điểm theo loại tiêu chí
            const currentScore = scoresByType.get(idLoaiTc) || 0;
            scoresByType.set(idLoaiTc, currentScore + diemDatDuoc);
        }

        // 4. Áp dụng Ngưỡng điểm và tính tổng điểm cuối cùng
        scoresByType.forEach((totalScore, idLoaiTc) => {
            const maxScore = maxScoreMap.get(idLoaiTc) || 0; // Nếu không cấu hình thì ngưỡng = 0
            const limitedScore = Math.min(totalScore, maxScore);
            finalTotalScore += limitedScore;
        });

        const xepLoai = this.determineGrade(finalTotalScore);

        // 5. Cập nhật hoặc tạo mới kết quả tổng kết
        return prisma.diemRenLuyen.upsert({
            where: { ma_sv_id_hoc_ky: { ma_sv: maSv, id_hoc_ky: idHocKy } },
            update: { tong_diem: finalTotalScore, xep_loai: xepLoai },
            create: { ma_sv: maSv, id_hoc_ky: idHocKy, tong_diem: finalTotalScore, xep_loai: xepLoai }
        });
    }

    // Xếp loại đơn giản theo tổng điểm
    public determineGrade(score: number): string {
        if (score >= 90) return 'XUAT_SAC';
        if (score >= 80) return 'GIOI';
        if (score >= 65) return 'KHA';
        if (score >= 50) return 'TRUNG_BINH';
        return 'YEU';
    }
}

