"use client"

import { ChildrenNode } from "@/types/Misc";
import { AnimatePresence, motion } from "motion/react";
import fadeOutVar from "./Variants/fadeOutVar";
import { usePathname } from "next/navigation";

type Para = ChildrenNode & {
  className?: string
}

function PageFadeOutTransition({ className='', children }: Para) {
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        variants={fadeOutVar({ duration: 0.15 })}
        initial={"initial"}
        exit={"exit"}
        key={firstPath}
      >
        { children }
      </motion.div>
    </AnimatePresence>
  )
}

export default PageFadeOutTransition;

export function PageFadeOut({ className = "", children }: Para) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        variants={fadeOutVar({ duration: 0.15 })}
        initial={"initial"}
        exit={"exit"}
        key={pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}