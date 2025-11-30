import { PageFadeOut } from "@/animations/PageFadeOutTransition";
import FrozenRoute from "@/components/HOC/FrozenRoute";
import ClassSidebar from "@/components/newSidebar/ClassSidebar";
import { SidebarLayout } from "@/components/PageSectionLayout";
import { ChildrenNode } from "@/types/Misc";


export default function ClassLayout({ children }: ChildrenNode) {
  return (
    <>
      <SidebarLayout sidebar={<ClassSidebar />} />

      <PageFadeOut className="flex flex-1">
        <FrozenRoute>
          { children }
        </FrozenRoute>
      </PageFadeOut>
    </>
  )
}