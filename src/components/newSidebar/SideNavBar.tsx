"use client"
import { ChildrenNode } from "@/types/Misc";
import { motion } from "motion/react";

function SideNavBar({ children }: ChildrenNode) {

  return (
    <motion.nav
      className="overflow-x-show border-r w-full h-full pr-8 relative"
    >
      { children }
    </motion.nav>
  )
}

export default SideNavBar;