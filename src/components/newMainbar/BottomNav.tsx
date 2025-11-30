"use client"

import { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import BottomNavButton from "./BottonNavButton";
import { pageTabLists } from "./mainTabList";


function BottomNav() {
  const [tab, setTab] = useState("Dashboard")
  const studentTabs = pageTabLists.student;

  return (
    <BottomNavBar>
      {studentTabs.map((menuTab) => (
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