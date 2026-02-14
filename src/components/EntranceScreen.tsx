"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";

export default function EntranceScreen() {
  const { setScreen, setMusicPlaying, setHasEnteredSite, hasEnteredSite, t } =
    useStore();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 1500);
    const t2 = setTimeout(() => setShowName(true), 3000);
    const t3 = setTimeout(() => setShowButton(true), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnter = () => {
    setMusicPlaying(true);
    setHasEnteredSite(true);
    setScreen("love-letter");
  };

  if (hasEnteredSite) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(100, 10, 30, 0.95) 0%, rgba(30, 5, 15, 0.98) 70%)",
        }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(180, 30, 60, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 60%, rgba(180, 30, 60, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 40%, rgba(180, 30, 60, 0.2) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Main title */}
        <motion.h1
          className="text-center relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span
            className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold"
            style={{
              fontFamily: "var(--font-romantic)",
              background:
                "linear-gradient(135deg, #ff6b8a, #ff1744, #ffd700, #ff6b8a)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255, 23, 68, 0.5))",
              animation: "shimmer 4s ease infinite",
            }}
          >
            {t("entrance.title")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              className="text-base sm:text-xl md:text-2xl text-rose-200/80 mt-4 sm:mt-6 text-center px-4"
              style={{ fontFamily: "var(--font-elegant)", fontWeight: 400 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t("entrance.subtitle")}
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                💝
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Name */}
        <AnimatePresence>
          {showName && (
            <motion.div
              className="mt-8 sm:mt-10 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <p
                className="text-sm sm:text-lg text-rose-300/60 tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-elegant)", fontWeight: 300 }}
              >
                {t("entrance.myDearest")}
              </p>
              <motion.h2
                className="text-5xl sm:text-6xl md:text-8xl mt-2"
                style={{
                  fontFamily: "var(--font-romantic)",
                  background:
                    "linear-gradient(135deg, #ffd700, #ffab40, #ffd700)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))",
                  animation: "shimmer 3s ease infinite",
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.3)",
                    "0 0 40px rgba(255, 215, 0, 0.6)",
                    "0 0 20px rgba(255, 215, 0, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("entrance.name")}
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              className="mt-10 sm:mt-14 relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={handleEnter}
            >
              <motion.div
                className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold text-white relative overflow-hidden"
                style={{
                  fontFamily: "var(--font-elegant)",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgba(155, 27, 48, 0.6), rgba(200, 40, 70, 0.6))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 100, 130, 0.4)",
                  boxShadow:
                    "0 0 30px rgba(255, 50, 80, 0.3), inset 0 0 30px rgba(255, 50, 80, 0.1)",
                }}
                whileHover={{
                  boxShadow:
                    "0 0 50px rgba(255, 50, 80, 0.5), inset 0 0 40px rgba(255, 50, 80, 0.2)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(255, 50, 80, 0.3), inset 0 0 30px rgba(255, 50, 80, 0.1)",
                    "0 0 45px rgba(255, 50, 80, 0.5), inset 0 0 35px rgba(255, 50, 80, 0.15)",
                    "0 0 30px rgba(255, 50, 80, 0.3), inset 0 0 30px rgba(255, 50, 80, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Shimmer overlay */}
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
                    repeatDelay: 3,
                  }}
                />
                {t("entrance.button")}
              </motion.div>

              {/* Pulsing heart below button */}
              <motion.div
                className="flex justify-center mt-4 text-2xl sm:text-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  filter: [
                    "drop-shadow(0 0 10px rgba(255, 50, 80, 0.5))",
                    "drop-shadow(0 0 25px rgba(255, 50, 80, 0.8))",
                    "drop-shadow(0 0 10px rgba(255, 50, 80, 0.5))",
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                💖
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
