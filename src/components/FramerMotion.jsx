import { motion } from "framer-motion";
import React from "react";

// Bas-komponent för animerade divar
export const BoxComponent = ({ children, initial, animate, transition, className }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// En fade-in-animation
export const FadeInBox = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// En slide-in-animation från botten
export const SlideInBox = ({ children, className }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
