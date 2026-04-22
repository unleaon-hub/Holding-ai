"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
