'use client';
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import "./navsidebar.css"

export function NavSidebarLayout({ backgroundColor, children }) {
  return (
    <div
    className="navsidebar flex flex-col flex-1 overflow-x-hidden"
    style={{ backgroundColor: backgroundColor }}
    >
      { children }
    </div>
  )
}

export function TopSidebar({ height, children }) {
  return (
    <div 
    className={`top-sidebar w-full`}
    style={{ height: height }}
    >
      { children }
    </div>
  )
}

export function HideSidebarButton({ toggleOnClick, icon="" }) {
  return (
    <button
    onClick={toggleOnClick}
    >
      {icon && <Image src={icon} alt="Hide sidebar"/>}
    </button>
  )
}

export function DropdownMenuBar({ typography="", icon="", backgroundColor="black", children }) {
  const [isDown, setIsDown] = useState(false);

  function toggleDropDown() {
    setIsDown((isDown) ? false : true);
  }

  return (
    <div className="flex flex-col overflow-y-hidden">
      <motion.div
        whileHover={{ filter: "brightness(1.3)" }}
        whileTap={{ filter: "brightness(1.1)" }}
        transition={{ duration: 0.2 }}
        className="headingbar flex flex-row cursor-pointer"
        style={{ backgroundColor: backgroundColor }}
        onClick={toggleDropDown}
      >
        {icon && (
          <div>
            <Image src={icon} alt="" />
          </div>
        )}
        <div>{typography}</div>
      </motion.div>

      <DropdownAnimation isOpen={isDown}>
        <div className="flex flex-col">{children}</div>
      </DropdownAnimation>
    </div>
  );
}

function DropdownAnimation({ isOpen, children }) {
  const dropdownAni = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
      className="overflow-hidden"
      variants={dropdownAni as any}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      >
        { children }
      </motion.div>
    </AnimatePresence>
  )
}

export function MenuBar({ typography="", onClick, isActive=false }) {
  return (
    isActive ?
      <motion.div
      className="menubar w-full text-center"
      animate={{ filter: "brightness(1.5)" }}
      transition={{ duration: 0.1 }}>
        { typography }
      </motion.div>
      :
      <motion.button
      className="menubar w-full cursor-pointer" 
      onClick={onClick}
      whileHover={{ filter: "brightness(1.3)" }}
      whileTap={{ filter: "brightness(1.1)" }}
      transition={{ duration: 0.2 }}
      >
        { typography }
      </motion.button>
  )
}