"use client";
import {
  NavSidebarLayout,
  TopSidebar,
  HideSidebarButton,
  DropdownMenuBar,
  MenuBar,
} from "./navsidebarComps";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function NavigationSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState("");

  const router = useRouter();
  const currentURL = usePathname();
  const route = currentURL.split('/');

  function toggleSidebar() {
    setIsOpen(isOpen ? false : true);
  }
  function checkActive(pageName) {
    return (pageName == page);
  }
  function navigateToPage(page) {
    router.push(page);
  }

  useEffect(() => {
    const getActivePage = () => {
      setPage(route[1]);
    };
    getActivePage();
  }, [route])

  return (
    <div className="flex w-[18%] h-screen">
      <NavSidebarLayout backgroundColor={"#2D2A2E"}>
        <TopSidebar height={"20%"}>
          <div className="flex flex-col items-center h-full w=full py-3">
            <div className="relative h-10/12 aspect-square bg-white rounded-full ">
              <Image
                className="object-contain"
                fill
                src={"/logo.svg"}
                alt="logo"
              />
            </div>
            <p>QUẢN LÝ ĐIỂM SINH VIÊN</p>
          </div>
        </TopSidebar>

        <div className="">
          <DropdownMenuBar typography="Dữ liệu" backgroundColor="#4c494d">
            <MenuBar
              typography="Home"
              onClick={() => navigateToPage("home")}
              isActive={checkActive("home")}
            />
            <MenuBar
              typography="Lớp"
              onClick={() => navigateToPage("class")}
              isActive={checkActive("class")}
            />
            <MenuBar
              typography="Sinh Viên"
              onClick={() => navigateToPage("student")}
              isActive={checkActive("student")}
            />
            <MenuBar
              typography="Giáo Viên"
              onClick={() => navigateToPage("teacher")}
              isActive={checkActive("teacher")}
            />
            <MenuBar
              typography="Học Phần"
              onClick={() => navigateToPage("course")}
              isActive={checkActive("course")}
            />
            <MenuBar
              typography="Ngành"
              onClick={() => navigateToPage("major")}
              isActive={checkActive("major")}
            />
          </DropdownMenuBar>
          <DropdownMenuBar typography="Tìm kiếm" backgroundColor="#4c494d">
            <MenuBar
              typography="Lớp"
              onClick={() => {}}
              isActive={checkActive("class-search")}
            />
            <MenuBar
              typography="Sinh viên"
              onClick={() => {}}
              isActive={checkActive("student-search")}
            />
            <MenuBar
              typography="Học Phần"
              onClick={() => {}}
              isActive={checkActive("course-search")}
            />
            <MenuBar
              typography="Ngành"
              onClick={() => {}}
              isActive={checkActive("major-search")}
            />
          </DropdownMenuBar>
          <DropdownMenuBar typography="Thêm" backgroundColor="#4c494d">
            <MenuBar
              typography="Sinh Viên"
              onClick={() => navigateToPage("student-add")}
              isActive={checkActive("student-add")}
            />
            <MenuBar
              typography="Điểm SV"
              onClick={() => navigateToPage("marks-add")}
              isActive={checkActive("marks-add")}
            />
            <MenuBar
              typography="Giáo Viên"
              onClick={() => navigateToPage("teacher-add")}
              isActive={checkActive("teacher-add")}
            />
          </DropdownMenuBar>
        </div>
      </NavSidebarLayout>
    </div>
  );
}
