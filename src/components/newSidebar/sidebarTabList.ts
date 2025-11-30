import { PageTab } from "@/types/PageTab";

export const infoDashboard: PageTab = {
  name: "Thông tin",
  nav: "/dashboard/info" 
}

export const test: PageTab = {
  name: "Test",
  nav: "/dashboard/test"
}

export const sidebarTabLists = {
  dashboard: [infoDashboard, test]
}