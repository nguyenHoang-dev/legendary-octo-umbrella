"use client"
import { AnimatePresence, motion, MotionProps, useAnimation } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Para = MotionProps & {
  icon?: string;
  navigateTo: string;
  typography: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function BottomNavButton({ typography, navigateTo, onClick, selected=false, icon="", ...props } : Para) {
  const router = useRouter();
  const hightlightControls = useAnimation();
  const hoverControls = useAnimation();

  return (
    <motion.button
      className="flex flex-col w-30 h-15 items-center justify-center cursor-pointer relative"
      onClick={(e) => {
        if (onClick) onClick(e);
        router.push(navigateTo);
      }}
      whileHover={{ color: "#666" }}
      whileTap={{ color: "#444" }}

      onHoverStart={() => hoverControls.start({ width: 35, height: 35})}
      onTapStart={() => hoverControls.start({ width: 60, backgroundColor: "rgb(255, 205, 136)" })}
      onHoverEnd={() => hoverControls.start({ width: "auto", height: "auto" })}

      {...props}
    >
      <div className="h-8 aspect-square relative">
        {icon && <Image src={icon} alt="nav icon" fill />}
      </div>
      <span>{typography}</span>
      {/* Nền tô đậm */}
      {selected && (
        <motion.div
          layoutId="highlightMain"
          className="absolute inset-0.5 rounded-full bg-blue-200 -z-5"
          animate={hightlightControls}
          onLayoutAnimationStart={() =>
            hightlightControls.start({ width: 50, height: 50, x: 32, y: 4 })
          }
          onLayoutAnimationComplete={() =>
            hightlightControls.start({ width: "auto", height: "auto", x: 0, y: 0 })
          }
          transition={{
            layout: { type: "spring", duration: 0.5, ease: "easeIn" },
            duration: 0.15,
            ease: "easeOut",
          }}
        />
      )}

      {/* Hover animation */}
      <AnimatePresence>
        {!selected && (
          <motion.div
            className="absolute top-0 mt-0.5 rounded-full -z-10"
            initial={{ width: 0, height: 0, backgroundColor: "rgb(255, 220, 171)" }}
            animate={hoverControls}
            exit={{
              width: 0,
              transition: { duration: 0.1 }
            }}
          >
        
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default BottomNavButton;