"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function TiltCard({ children, onClick }: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  return (
    <motion.div
      ref={ref}
      className="[transform-style:preserve-3d]"
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="rounded-2xl shadow-[0_12px_40px_-12px_rgba(2,6,23,.15)] ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
        onClick={onClick}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
