"use client"

import { motion, type Variants } from "motion/react";
import React, { type ReactNode } from "react";

const container: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const child: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

function ChildrenFadeAni({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="visible"
      className="flex flex-col"
    >
      {React.Children.map(children, (element, index) => (
        <motion.div
          variants={child}
          initial="hidden"
          animate="visible"
          key={index}
        >
          {element}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ChildrenFadeAni;
