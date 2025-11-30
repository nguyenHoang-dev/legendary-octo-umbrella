"use client"

import { Variants } from "motion";
const fadeOutVar = ({ duration } : { duration: number }): Variants => ({
  initial: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration
    }
  }
})

export default fadeOutVar;