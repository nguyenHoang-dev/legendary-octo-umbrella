"use client"

import { useState } from "react";
import SideNavBar from "./SideNavBar";
import { sidebarTabLists } from "./sidebarTabList";
import SidebarButton from "./SidebarButton";


function HomeSidebar() {
  const [tab, setTab] = useState("");
  const dashboardTabs = sidebarTabLists.dashboard;

  return (
    <SideNavBar>
      {dashboardTabs.map((menuTab) => (
        <SidebarButton 
          key={menuTab.name}
          typography={menuTab.name}
          navigateTo={menuTab.nav}
          onClick={() => setTab(menuTab.name)}
          selected={tab === menuTab.name}
        />
      ))}
    </SideNavBar>
  )
}

export default HomeSidebar;