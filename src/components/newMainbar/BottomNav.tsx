"use client"

import { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import BottomNavButton from "./BottonNavButton";
import { pageTabLists } from "./mainTabList";
import { PageTab } from "@/types/PageTab";


function BottomNav({ accountRole }: { accountRole: string }) {
  const [tab, setTab] = useState("Dashboard")
  let tabs: PageTab[];

  if (accountRole === "Admin") {
    tabs = pageTabLists.admin;
  } else if (accountRole === "QuanTri") {
    tabs = pageTabLists.quanTri;
  } else {
    tabs = pageTabLists.student;
  }

  return (
    <BottomNavBar>
      {tabs.map((menuTab) => (
        <BottomNavButton 
          key={menuTab.name}
          typography={menuTab.name} 
          navigateTo={menuTab.nav}
          icon={menuTab.icon}
          onClick={() => setTab(menuTab.name)}
          selected={tab === menuTab.name}
        />
      ))}
    </BottomNavBar>
  )
}

export default BottomNav;