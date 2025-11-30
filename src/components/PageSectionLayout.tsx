import DivSlideIn from "@/animations/DivSlideIn";
import { ChildrenNode } from "@/types/Misc";
import { ReactNode } from "react";


type Para = {
  sidebar: ReactNode
}

// Layout và animation cho từng mục page
export function SidebarLayout({ sidebar }: Para) {
  return (
    <DivSlideIn
      className="ml-10 w-[15%] h-[50%] self-center justify-self-center"
      direction="left"
    >
      {sidebar}
    </DivSlideIn>
  );
}

export function SectionTemplate({ children }: ChildrenNode) {
  return (
    <DivSlideIn
      className="overflow-y-auto flex-1 m-10 div-container"
      direction="right"
    >
      {children}
    </DivSlideIn>
  );
}

type Para2 = ChildrenNode & Para;

export function PageSectionLayout({ sidebar, children }: Para2) {
  return (
    <>
      <SidebarLayout sidebar={sidebar} />

      <SectionTemplate>
        { children }
      </SectionTemplate>
    </>
  );
}