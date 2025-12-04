"use client"

import { useState } from "react";
import SideNavBar from "./SideNavBar";
import { sidebarTabLists } from "./sidebarTabList";
import SidebarButton from "./SidebarButton";
import { PageTab } from "@/types/PageTab";

export type SidebarType = "dashboard" | "class" | "score" | "report" | "create" | "view";

type TabType = {
  default: string,
  list: PageTab[]
}

function LeftSidebar({ sidebarType }: { sidebarType: SidebarType }) {
  const sidebarTabs = sidebarTabLists[sidebarType] as TabType;

  const [tab, setTab] = useState(sidebarTabs.default);
  const tabs = sidebarTabs.list;

  return (
    <SideNavBar>
      {tabs.map((menuTab) => (
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

export default LeftSidebar;