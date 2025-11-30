import { PageFadeOut } from "@/animations/PageFadeOutTransition";
import FrozenRoute from "@/components/HOC/FrozenRoute";
import HomeSidebar from "@/components/newSidebar/HomeSidebar";
import { SidebarLayout } from "@/components/PageSectionLayout";
import { ChildrenNode } from "@/types/Misc";


export default function DashboardLayout({ children }: ChildrenNode) {
  return (
    <>
      <SidebarLayout sidebar={<HomeSidebar />} />

      <PageFadeOut className="flex flex-1">
        <FrozenRoute>
          { children }
        </FrozenRoute>
      </PageFadeOut>
    </>
  )
}