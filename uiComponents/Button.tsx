"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";
import { ButtonProps } from "../interfaces/button.interface";

// Framer Motion should only animate transform (scale) to avoid color delay
const defaultButtonVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export const CustomButton: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
  className = "",
  custom,
  initial = "initial",
  animate,
  variants = {}, // External variants like fadeUp
  whileHover = "hover",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`
        relative flex items-center justify-center gap-2 rounded-[2px] overflow-hidden origin-left 
        bg-transparent border border-black text-black 
        hover:bg-[#B57F12] hover:text-white hover:border-[#B57F12]
        transition-colors duration-0
        ${className}
      `}
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      custom={custom}
      variants={{
        ...defaultButtonVariants,
        ...variants,
      }}
    >
      <span className="whitespace-nowrap">{text}</span>

      <motion.div
        variants={{
          initial: { x: 0 },
          hover: {
            x: 8,
            transition: {
              duration: 0.35,
              ease: [0.25, 1, 0.5, 1],
            },
          },
        }}
      >
        <ArrowRight className="w-3 h-3 md:w-5 md:h-5 stroke-current" />
      </motion.div>
    </motion.button>
  );
};
