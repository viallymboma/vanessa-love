"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window);

    let trailId = 0;
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" ||
          target.tagName === "A"
      );

      trailId++;
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId };
      setTrail((prev) => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail sparkles */}
      {trail.map((t, i) => (
        <motion.div
          key={t.id}
          className="fixed pointer-events-none z-[9999]"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: t.x - 3,
            top: t.y - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: `rgba(255, ${100 + i * 15}, ${130 + i * 10}, ${0.5 + i * 0.05})`,
            boxShadow: `0 0 ${4 + i}px rgba(255, 80, 120, 0.4)`,
          }}
        />
      ))}

      {/* Main cursor - heart */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div
          className="text-xl"
          style={{
            filter: "drop-shadow(0 0 6px rgba(255, 50, 80, 0.7))",
          }}
        >
          {isPointer ? "💖" : "💗"}
        </div>
      </motion.div>

      {/* Glow ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width: 40,
          height: 40,
          border: "1.5px solid rgba(255, 100, 130, 0.3)",
          boxShadow: "0 0 15px rgba(255, 50, 80, 0.15)",
        }}
      />
    </>
  );
}
