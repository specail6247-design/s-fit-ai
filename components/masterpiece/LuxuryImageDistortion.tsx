"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function LuxuryImageDistortion({ children }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, filter: "brightness(1.1) saturate(1.2)" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full overflow-hidden rounded-xl"
    >
      {children}
    </motion.div>
  );
}
