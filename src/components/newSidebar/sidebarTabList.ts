import { PageTab } from "@/types/PageTab";

// Dashboard
export const infoDashboard: PageTab = {
  name: "Thông tin",
  nav: "/dashboard/info" 
}

export const test: PageTab = {
  name: "Test",
  nav: "/dashboard/test"
}

// Quản Ly
export const viewStudent: PageTab = {
  name: "Sinh viên",
  nav: "/admin-dashboard/students"
}

// Tạo Mới
export const createAccount: PageTab = {
  name: "Tài khoản",
  nav: "/create/account"
}
export const createClass: PageTab = {
  name: "Lớp",
  nav: "/create/class"
}
export const createSemester: PageTab = {
  name: "Học kỳ và phiếu rèn luyện",
  nav: "/create/semester"
}

export const sidebarTabLists = {
  dashboard: {
    default: infoDashboard.name,
    list: [infoDashboard, test]
  },
  create: {
    default: createAccount.name,
    list: [createAccount, createClass, createSemester]
  }
}