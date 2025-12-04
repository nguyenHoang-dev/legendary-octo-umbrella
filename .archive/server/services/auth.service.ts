import prisma from './prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client'; 
// Import các kiểu TaiKhoan, Role từ Prisma tự động sinh

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const SALT_ROUNDS = 10;

export class AuthService {

    // 1. Đăng ký tài khoản mới (Hashing)
    public async register(tenDangNhap: string, matKhau: string, vaiTro: Role, maSVLienKet?: string) {
        // [Logic kiểm tra tồn tại và mã hóa mật khẩu ở đây]
        const matKhauDaHash = await bcrypt.hash(matKhau, SALT_ROUNDS);

        const newUser = await prisma.taiKhoan.create({
            data: {
                ten_dang_nhap: tenDangNhap,
                mat_khau: matKhauDaHash,
                vai_tro: vaiTro,
                ma_sv_lien_ket: maSVLienKet,
            },
        });
        
        // Trả về thông tin user (không kèm mật khẩu)
        const { mat_khau, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    // 2. Đăng nhập (Compare Hash & Generate JWT)
    public async login(tenDangNhap: string, matKhau: string) {
        const user = await prisma.taiKhoan.findUnique({ where: { ten_dang_nhap: tenDangNhap } });

        if (!user || !(await bcrypt.compare(matKhau, user.mat_khau))) {
            throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
        }

        // Tạo Payload cho JWT (chứa thông tin user cần thiết)
        const payload = {
            id: user.id_tai_khoan,
            username: user.ten_dang_nhap,
            role: user.vai_tro,
            maSV: user.ma_sv_lien_ket,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        return {
            token,
            user: { id: user.id_tai_khoan, ten_dang_nhap: user.ten_dang_nhap, vai_tro: user.vai_tro },
        };
    }
}

