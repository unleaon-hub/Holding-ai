"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HoverCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function HoverCard({ className, children }: HoverCardProps) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className={cn("interactive-card", className)}
    >
      {children}
    </motion.article>
  );
}
