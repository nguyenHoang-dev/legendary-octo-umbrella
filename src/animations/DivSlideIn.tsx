"use client"

import { ChildrenNode } from "@/types/Misc";
import { Transition, Variants } from "motion/react";
import { motion } from "motion/react";

const SlideInAni: Variants = {
  closedLeft: {
    opacity: 0,
    x: "-100%"
  },
  closedRight: {
    opacity: 0,
    x: "100%"
  },
  open: {
    opacity: 1,
    x: 0
  },
}

const slideTransition: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1.6,
  ease: "easeOut",
};


type Para = ChildrenNode & {
  className: string;
  direction: "left" | "right";
}

function DivSlideIn({ direction, className, children }: Para) {
  return (
    <motion.div
      className={className}
      variants={SlideInAni}
      initial={direction === "left" ? "closedLeft" : "closedRight"}
      animate={"open"}
      transition={slideTransition}
    >
      { children }
    </motion.div>
  );
}

export default DivSlideIn;