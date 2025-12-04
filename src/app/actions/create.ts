"use server"

import prisma from "@/lib/prisma"


export async function createSinhVien(taiKhoanId: string, khoa_nam: number, msv: string) {

  await prisma.sinhVien.create({
    data: {
      taiKhoanId: taiKhoanId,
      khoa_nam: khoa_nam,
      ma_sv: msv
    }
  })
}

export async function createQuanTri(taiKhoanId: string, mqt: string) {

  await prisma.quanTri.create({
    data: {
      ma_qt: mqt,
      taiKhoanId: taiKhoanId
    }
  })
}

export async function countSinhVien() {
  const count = await prisma.sinhVien.count();
  return count;
}

export async function countQuanTri() {
  const count = await prisma.quanTri.count();
  return count;
}