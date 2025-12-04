// import PageFadeOutTransition from "@/animations/PageFadeOutTransition";
// import FrozenRoute from "@/components/HOC/FrozenRoute";
import BottomNav from "@/components/newMainbar/BottomNav";
import PageRedBar from "@/components/PageRedBar";
import { auth } from "@/lib/auth";
import { ChildrenNode } from "@/types/Misc";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PageLayout({ children }: ChildrenNode) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* Deco */}
      <PageRedBar />

      {/* Trang mục và fade out khi di chuyển sang mục khác */}
      <div className="flex flex-row h-full w-full gap-7">
        {children}
      </div>

      {/* Mục di chuyển ở dưới */}
      <div className="h-20">
        <BottomNav accountRole={session.user.role} />
      </div>
    </div>
  );
}