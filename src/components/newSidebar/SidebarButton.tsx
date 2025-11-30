"use client"

import { MotionProps } from "motion/react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import "./dotStyle.css"

type Para = MotionProps & {
  navigateTo: string;
  typography: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function SidebarButton({ typography, navigateTo, onClick, selected=false, ...props }: Para) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full relative">
      <motion.button
        className="text-end cursor-pointer w-fit self-end"
        onClick={(e) => {
          if (onClick) onClick(e);
          router.push(navigateTo);
        }}
        {...props}
      >
        <span>{typography}</span>
      </motion.button>

      {/* Cái dấu chấm bên phải */}
      {selected && (
        <motion.div
          layoutId="sidebarDot"
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-9.5 w-3 h-3 rounded-full z-20 dot-style"
        />
      )}
    </div>
  );
};

export default SidebarButton;