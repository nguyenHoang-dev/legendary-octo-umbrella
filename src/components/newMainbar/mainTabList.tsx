import { PageTab } from "@/types/PageTab";

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

export const pageTabLists: Record<string, PageTab[]> = {
  student: [dashboardTab, classTab, scoreTab, reportTab],
}