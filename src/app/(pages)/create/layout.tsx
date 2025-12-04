import { PageFadeOut } from "@/animations/PageFadeOutTransition";
import getAccountRole from "@/components/auth/sessionHelper";
import FrozenRoute from "@/components/HOC/FrozenRoute";
import LeftSidebar from "@/components/newSidebar/LeftSidebar";
import { SidebarLayout } from "@/components/PageSectionLayout";
import NotPermittedPage from "@/components/status/NotPermittedPage";
import { ChildrenNode } from "@/types/Misc";


export default async function RouteLayout({ children }: ChildrenNode) {
  const hasPermission = await getAccountRole() === "Admin";

  return (
    <>
      {hasPermission ? <>
        <SidebarLayout sidebar={<LeftSidebar sidebarType="create" />} />

        <PageFadeOut className="flex flex-1">
          <FrozenRoute>
            { children }
          </FrozenRoute>
        </PageFadeOut>
      </> : <NotPermittedPage />
        
      }
    </>
  )
}