"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import type { TranslationKey } from "@/i18n";

const lineKeys: TranslationKey[] = [
  "finale.line.0",
  "finale.line.1",
  "finale.line.2",
  "finale.line.3",
  "finale.line.4",
  "finale.line.5",
  "finale.line.6",
  "finale.line.7",
];

export default function FinaleScreen() {
  const { currentScreen, setShowConfetti, t } = useStore();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  useEffect(() => {
    if (currentScreen !== "finale") return;

    setVisibleLines(0);
    setShowFinal(false);
    setShowHeartBurst(false);

    const timers: NodeJS.Timeout[] = [];

    lineKeys.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), (i + 1) * 1500)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowFinal(true);
        setShowConfetti(true);
        setShowHeartBurst(true);
      }, (lineKeys.length + 1) * 1500)
    );

    return () => timers.forEach(clearTimeout);
  }, [currentScreen, setShowConfetti]);

  if (currentScreen !== "finale") return null;

  return (
    <motion.div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dramatic glow background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(180, 30, 60, 0.25) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(200, 40, 70, 0.35) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(180, 30, 60, 0.25) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Messages */}
      <div className="max-w-2xl w-full space-y-4 sm:space-y-6 text-center relative z-10">
        {lineKeys.map((key, i) => (
          <AnimatePresence key={key}>
            {i < visibleLines && (
              <motion.p
                className={`${
                  i === 0
                    ? "text-3xl sm:text-4xl md:text-5xl"
                    : "text-base sm:text-xl md:text-2xl"
                } leading-relaxed`}
                style={{
                  fontFamily:
                    i === 0
                      ? "var(--font-romantic)"
                      : "var(--font-elegant)",
                  fontWeight: i === 0 ? undefined : 400,
                  color:
                    i === 0
                      ? "#ffd700"
                      : i === lineKeys.length - 1
                      ? "#ff6b8a"
                      : "rgba(255, 200, 210, 0.85)",
                  textShadow:
                    i === 0
                      ? "0 0 30px rgba(255, 215, 0, 0.4)"
                      : "0 0 15px rgba(255, 100, 130, 0.15)",
                }}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
              >
                {t(key)}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Final I Love You */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            className="mt-10 sm:mt-16 text-center relative z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
              style={{
                fontFamily: "var(--font-romantic)",
                background:
                  "linear-gradient(135deg, #ff1744, #ffd700, #ff6b8a, #ffd700, #ff1744)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s ease infinite",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 0 30px rgba(255, 23, 68, 0.5))",
                  "drop-shadow(0 0 60px rgba(255, 215, 0, 0.6))",
                  "drop-shadow(0 0 30px rgba(255, 23, 68, 0.5))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t("finale.iloveyou")}
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl md:text-5xl mt-3 sm:mt-4"
              style={{
                fontFamily: "var(--font-romantic)",
                color: "#ffd700",
                filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t("finale.name")}
            </motion.p>

            {/* Pulsing mega heart */}
            <motion.div
              className="mt-6 sm:mt-8 text-5xl sm:text-7xl"
              animate={{
                scale: [1, 1.3, 1],
                filter: [
                  "drop-shadow(0 0 20px rgba(255, 50, 80, 0.6))",
                  "drop-shadow(0 0 50px rgba(255, 50, 80, 0.9))",
                  "drop-shadow(0 0 20px rgba(255, 50, 80, 0.6))",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💖
            </motion.div>

            <motion.p
              className="mt-6 sm:mt-8 text-xs sm:text-base text-rose-300/50 px-4 pb-20"
              style={{ fontFamily: "var(--font-elegant)", fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {t("finale.closing")}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart burst effect */}
      <AnimatePresence>
        {showHeartBurst && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className="fixed text-xl sm:text-2xl pointer-events-none z-30"
                style={{ left: "50%", top: "50%" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * (window.innerWidth < 640 ? 300 : 600),
                  y: (Math.random() - 0.5) * (window.innerWidth < 640 ? 300 : 600),
                  opacity: 0,
                  scale: Math.random() * 2 + 1,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                }}
              >
                {["💖", "💕", "💗", "💝", "❤️", "🌹", "✨"][i % 7]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
