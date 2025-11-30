"use client";

import { ChildrenNode } from "@/types/Misc";
import "./BottomNavBar.css"
import React from "react";
import { motion } from "motion/react";

function BottomNavBar({ children }: ChildrenNode) {
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.nav className="bottom-bar absolute bottom-0 left-0 right-0 m-auto w-fit pl-3 pr-3 z-10">
      <div className="flex flex-1 items-center gap-2.5 justify-start">
        {childrenArray.slice(0, Math.ceil(childrenArray.length / 2))}
      </div>
      {/* Space in the middle */}
      <div className="w-10 shrink-0" />

      <div className="flex flex-1 items-center gap-2.5 justify-end">
        {childrenArray.slice(Math.ceil(childrenArray.length / 2))}
      </div>
    </motion.nav>
  );
}

export default BottomNavBar;