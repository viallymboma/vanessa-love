"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  icon: string;
  opacity: number;
}

const loveIcons = ["❤️", "💕", "💖", "💗", "💓", "💘", "💝", "🌹", "✨", "💐", "🦋", "💞"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      icon: loveIcons[Math.floor(Math.random() * loveIcons.length)],
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 60, Math.cos(heart.id) * -40, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.icon}
        </motion.div>
      ))}
    </div>
  );
}
