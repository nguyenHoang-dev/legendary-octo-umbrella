"use client";

import { useContext, useState } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChildrenNode } from "@/types/Misc";

const FrozenRoute = ({ children }: ChildrenNode) => {
  const context = useContext(LayoutRouterContext);
  const [frozen] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
};

export default FrozenRoute;
