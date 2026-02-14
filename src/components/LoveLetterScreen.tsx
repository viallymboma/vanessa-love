"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import type { TranslationKey } from "@/i18n";

const lineKeys: TranslationKey[] = [
  "letter.line1",
  "letter.line2",
  "letter.line3",
  "letter.line4",
  "letter.line5",
  "letter.line6",
  "letter.line7",
  "letter.line8",
  "letter.line9",
  "letter.line10",
];

export default function LoveLetterScreen() {
  const { currentScreen, setScreen, t } = useStore();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentScreen !== "love-letter") return;

    setVisibleLines(0);
    setShowButton(false);

    const intervals: NodeJS.Timeout[] = [];

    lineKeys.forEach((_, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1);
      }, (i + 1) * 1200);
      intervals.push(timer);
    });

    const btnTimer = setTimeout(
      () => setShowButton(true),
      (lineKeys.length + 1) * 1200
    );
    intervals.push(btnTimer);

    return () => intervals.forEach(clearTimeout);
  }, [currentScreen]);

  if (currentScreen !== "love-letter") return null;

  return (
    <motion.div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Glassmorphism card */}
      <motion.div
        className="max-w-2xl w-full rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
        style={{
          background: "rgba(80, 10, 25, 0.3)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 100, 130, 0.2)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 50, 80, 0.05)",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Glow accent */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 50, 80, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-center"
          style={{
            fontFamily: "var(--font-romantic)",
            color: "#ffd700",
            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("letter.title")}
        </motion.h2>

        <div className="space-y-3 sm:space-y-4">
          {lineKeys.map((key, i) => (
            <AnimatePresence key={key}>
              {i < visibleLines && (
                <motion.p
                  className="text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-elegant)",
                    fontWeight: 400,
                    fontSize: undefined,
                    color:
                      i === lineKeys.length - 1
                        ? "#ffd700"
                        : "rgba(255, 200, 210, 0.9)",
                    textShadow:
                      i === lineKeys.length - 1
                        ? "0 0 20px rgba(255, 215, 0, 0.3)"
                        : "none",
                  }}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {t(key)}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Continue button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              className="flex justify-center mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                className="px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base text-white font-semibold cursor-pointer relative overflow-hidden"
                style={{
                  fontFamily: "var(--font-elegant)",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgba(200, 40, 70, 0.5), rgba(155, 27, 48, 0.5))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 100, 130, 0.4)",
                  boxShadow: "0 0 25px rgba(255, 50, 80, 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(255, 50, 80, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen("questions")}
              >
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
                {t("letter.button")}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
