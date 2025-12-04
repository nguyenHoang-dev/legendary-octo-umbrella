import { PageTab } from "@/types/PageTab";

// Student tabs
export const dashboardTab: PageTab = {
  name: "Dashboard",
  nav: "/dashboard/info",
  icon: "/dashboard.svg"
};

export const classTab: PageTab = {
  name: "Lớp",
  nav: "/class/info",
  icon: "/class.svg"
};

export const scoreTab: PageTab = {
  name: "Điểm rèn luyện",
  nav: "",
  icon: "/score.svg"
};

export const reportTab: PageTab = {
  name: "Khai báo",
  nav: "",
  icon: "/report.svg"
};

// Admin
export const createTab: PageTab = {
  name: "Tạo Mới",
  nav: "/create/account",
  icon: "",
}

export const viewTab: PageTab = {
  name: "Quản Lý",
  nav: "/admin-dashboard/students"
}

export const pageTabLists = {
  student: [dashboardTab, classTab, scoreTab, reportTab],
  quanTri: [dashboardTab],
  admin: [viewTab, createTab]
}