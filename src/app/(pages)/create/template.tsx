import "@/globals.css";
import { ChildrenNode } from "@/types/Misc";
import { SectionTemplate } from "@/components/PageSectionLayout";

// Layout và animation giữa các trang
export default function RouteTemplate({ children }: ChildrenNode) {
  return (
    <SectionTemplate>
      { children }
    </SectionTemplate>
  );
}
