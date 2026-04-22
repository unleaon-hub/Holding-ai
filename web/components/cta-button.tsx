"use client";

import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  asChild?: boolean;
  className?: string;
  eventName: string;
  eventContext: string;
  children: React.ReactNode;
};

export function CtaButton({
  asChild,
  className,
  eventName,
  eventContext,
  children,
}: CtaButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="inline-block"
    >
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          className,
        )}
        onClick={() =>
          trackEvent(eventName, {
            context: eventContext,
            surface: "landing",
          })
        }
      >
        {children}
      </Comp>
    </motion.div>
  );
}
