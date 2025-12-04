import { PageFadeOut } from "@/animations/PageFadeOutTransition";
import FrozenRoute from "@/components/HOC/FrozenRoute";
import LeftSidebar from "@/components/newSidebar/LeftSidebar";
import { SidebarLayout } from "@/components/PageSectionLayout";
import { ChildrenNode } from "@/types/Misc";


export default function DashboardLayout({ children }: ChildrenNode) {
  return (
    <>
      <SidebarLayout sidebar={<LeftSidebar sidebarType="dashboard"/>} />

      <PageFadeOut className="flex flex-1">
        <FrozenRoute>
          { children }
        </FrozenRoute>
      </PageFadeOut>
    </>
  )
}