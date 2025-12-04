-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'CanSu', 'QuanTri', 'Admin');

-- CreateEnum
CREATE TYPE "TrangThaiThamGia" AS ENUM ('cho_duyet', 'da_duyet', 'tu_choi');

-- CreateTable
CREATE TABLE "Lop" (
    "id_lop" SERIAL NOT NULL,
    "ten_lop" VARCHAR(50) NOT NULL,
    "khoa" VARCHAR(100),
    "quanTriMa_qt" VARCHAR(20) NOT NULL,

    CONSTRAINT "Lop_pkey" PRIMARY KEY ("id_lop")
);

-- CreateTable
CREATE TABLE "HocKy" (
    "id_hoc_ky" SERIAL NOT NULL,
    "ngay_bat_dau" DATE,
    "ngay_ket_thuc" DATE,

    CONSTRAINT "HocKy_pkey" PRIMARY KEY ("id_hoc_ky")
);

-- CreateTable
CREATE TABLE "SinhVien" (
    "ma_sv" VARCHAR(20) NOT NULL,
    "isCanSu" BOOLEAN NOT NULL DEFAULT false,
    "khoa_nam" INTEGER,
    "id_lop" INTEGER,
    "taiKhoanId" TEXT NOT NULL,

    CONSTRAINT "SinhVien_pkey" PRIMARY KEY ("ma_sv")
);

-- CreateTable
CREATE TABLE "QuanTri" (
    "ma_qt" VARCHAR(20) NOT NULL,
    "taiKhoanId" TEXT NOT NULL,

    CONSTRAINT "QuanTri_pkey" PRIMARY KEY ("ma_qt")
);

-- CreateTable
CREATE TABLE "HoatDong" (
    "id_hoat_dong" SERIAL NOT NULL,
    "ten_hoat_dong" VARCHAR(255) NOT NULL,
    "id_hoc_ky" INTEGER NOT NULL,

    CONSTRAINT "HoatDong_pkey" PRIMARY KEY ("id_hoat_dong")
);

-- CreateTable
CREATE TABLE "ThamGia" (
    "id_tham_gia" SERIAL NOT NULL,
    "diem_dat_duoc" INTEGER NOT NULL,
    "ngay_ghi_nhan" DATE,
    "minh_chung" VARCHAR(255),
    "trang_thai" "TrangThaiThamGia" NOT NULL DEFAULT 'cho_duyet',
    "ma_sv" VARCHAR(20) NOT NULL,
    "id_hoat_dong" INTEGER NOT NULL,

    CONSTRAINT "ThamGia_pkey" PRIMARY KEY ("id_tham_gia")
);

-- CreateTable
CREATE TABLE "DiemRenLuyen" (
    "id_diem_rl" SERIAL NOT NULL,
    "cac_diem_tc" JSONB NOT NULL,
    "ma_sv" VARCHAR(20) NOT NULL,
    "id_hoc_ky" INTEGER NOT NULL,

    CONSTRAINT "DiemRenLuyen_pkey" PRIMARY KEY ("id_diem_rl")
);

-- CreateTable
CREATE TABLE "TaiKhoan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Student',

    CONSTRAINT "TaiKhoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lop_ten_lop_key" ON "Lop"("ten_lop");

-- CreateIndex
CREATE UNIQUE INDEX "SinhVien_taiKhoanId_key" ON "SinhVien"("taiKhoanId");

-- CreateIndex
CREATE UNIQUE INDEX "QuanTri_taiKhoanId_key" ON "QuanTri"("taiKhoanId");

-- CreateIndex
CREATE UNIQUE INDEX "DiemRenLuyen_ma_sv_id_hoc_ky_key" ON "DiemRenLuyen"("ma_sv", "id_hoc_ky");

-- CreateIndex
CREATE UNIQUE INDEX "TaiKhoan_email_key" ON "TaiKhoan"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- AddForeignKey
ALTER TABLE "Lop" ADD CONSTRAINT "Lop_quanTriMa_qt_fkey" FOREIGN KEY ("quanTriMa_qt") REFERENCES "QuanTri"("ma_qt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinhVien" ADD CONSTRAINT "SinhVien_id_lop_fkey" FOREIGN KEY ("id_lop") REFERENCES "Lop"("id_lop") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SinhVien" ADD CONSTRAINT "SinhVien_taiKhoanId_fkey" FOREIGN KEY ("taiKhoanId") REFERENCES "TaiKhoan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuanTri" ADD CONSTRAINT "QuanTri_taiKhoanId_fkey" FOREIGN KEY ("taiKhoanId") REFERENCES "TaiKhoan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoatDong" ADD CONSTRAINT "HoatDong_id_hoc_ky_fkey" FOREIGN KEY ("id_hoc_ky") REFERENCES "HocKy"("id_hoc_ky") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThamGia" ADD CONSTRAINT "ThamGia_ma_sv_fkey" FOREIGN KEY ("ma_sv") REFERENCES "SinhVien"("ma_sv") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThamGia" ADD CONSTRAINT "ThamGia_id_hoat_dong_fkey" FOREIGN KEY ("id_hoat_dong") REFERENCES "HoatDong"("id_hoat_dong") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiemRenLuyen" ADD CONSTRAINT "DiemRenLuyen_ma_sv_fkey" FOREIGN KEY ("ma_sv") REFERENCES "SinhVien"("ma_sv") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiemRenLuyen" ADD CONSTRAINT "DiemRenLuyen_id_hoc_ky_fkey" FOREIGN KEY ("id_hoc_ky") REFERENCES "HocKy"("id_hoc_ky") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TaiKhoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TaiKhoan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
