"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState, useCallback, useEffect } from "react";
import type { TranslationKey } from "@/i18n";

export default function QuestionsScreen() {
  const {
    currentScreen,
    setScreen,
    currentQuestion,
    totalQuestions,
    answerQuestion,
    setShowConfetti,
    t,
  } = useStore();
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  const handleDodge = useCallback(() => {
    const maxX = window.innerWidth < 640 ? 100 : 200;
    const maxY = window.innerWidth < 640 ? 80 : 150;
    setNoPosition({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
    setDodgeCount((prev) => prev + 1);
  }, []);

  const handleYes = useCallback(() => {
    if (currentQuestion >= totalQuestions) return;

    const responseKey =
      `question.${currentQuestion}.response` as TranslationKey;
    setCurrentResponse(t(responseKey));
    setShowResponse(true);
    setShowConfetti(true);

    setTimeout(() => {
      answerQuestion(currentQuestion);
      setShowResponse(false);
      setDodgeCount(0);
      setNoPosition({ x: 0, y: 0 });

      if (currentQuestion >= totalQuestions - 1) {
        setTimeout(() => setScreen("gallery"), 800);
      }
    }, 2500);
  }, [
    currentQuestion,
    totalQuestions,
    answerQuestion,
    setShowConfetti,
    setScreen,
    t,
  ]);

  useEffect(() => {
    setDodgeCount(0);
    setNoPosition({ x: 0, y: 0 });
  }, [currentQuestion]);

  if (currentScreen !== "questions") return null;
  if (currentQuestion >= totalQuestions) return null;

  const textKey = `question.${currentQuestion}.text` as TranslationKey;
  const yesKey = `question.${currentQuestion}.yes` as TranslationKey;
  const noKey = `question.${currentQuestion}.no` as TranslationKey;

  const dodgeKey = `question.dodge.${Math.min(dodgeCount - 1, 6)}` as TranslationKey;

  return (
    <motion.div
      className="min-h-screen min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Progress dots */}
      <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
            style={{
              background:
                i < currentQuestion
                  ? "linear-gradient(135deg, #ff1744, #ffd700)"
                  : i === currentQuestion
                  ? "rgba(255, 100, 130, 0.8)"
                  : "rgba(255, 100, 130, 0.2)",
              boxShadow:
                i <= currentQuestion
                  ? "0 0 10px rgba(255, 50, 80, 0.5)"
                  : "none",
            }}
            animate={
              i === currentQuestion ? { scale: [1, 1.4, 1] } : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="max-w-xl w-full rounded-3xl p-6 sm:p-8 md:p-10 text-center relative overflow-hidden"
          style={{
            background: "rgba(80, 10, 25, 0.35)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 100, 130, 0.25)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 50, 80, 0.05), 0 0 80px rgba(255, 50, 80, 0.1)",
          }}
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Pulsing heart */}
          <motion.div
            className="text-4xl sm:text-5xl mb-4 sm:mb-6"
            animate={{
              scale: [1, 1.25, 1],
              filter: [
                "drop-shadow(0 0 10px rgba(255,50,80,0.4))",
                "drop-shadow(0 0 25px rgba(255,50,80,0.8))",
                "drop-shadow(0 0 10px rgba(255,50,80,0.4))",
              ],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            💖
          </motion.div>

          <motion.h2
            className="text-lg sm:text-2xl md:text-3xl mb-8 sm:mb-10 leading-relaxed"
            style={{
              fontFamily: "var(--font-elegant)",
              fontWeight: 400,
              color: "rgba(255, 220, 230, 0.95)",
              textShadow: "0 0 20px rgba(255, 100, 130, 0.2)",
            }}
          >
            {t(textKey)}
          </motion.h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[100px]">
            {/* Yes button */}
            <motion.button
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold text-white relative overflow-hidden cursor-pointer"
              style={{
                fontFamily: "var(--font-elegant)",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg, #ff1744, #c2185b, #ff1744)",
                backgroundSize: "200% 200%",
                boxShadow:
                  "0 0 30px rgba(255, 23, 68, 0.4), 0 0 60px rgba(255, 23, 68, 0.2)",
                animation: "shimmer 3s ease infinite",
              }}
              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 0 50px rgba(255, 23, 68, 0.6), 0 0 80px rgba(255, 23, 68, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
            >
              <motion.div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              {t(yesKey)}
            </motion.button>

            {/* No button - dodges */}
            <motion.button
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm text-rose-300/60 hover:text-rose-300/80 transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-body)" }}
              animate={{
                x: noPosition.x,
                y: noPosition.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onMouseEnter={handleDodge}
              onTouchStart={handleDodge}
              onClick={handleDodge}
            >
              {dodgeCount > 0 ? t(dodgeKey) : t(noKey)}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Response overlay */}
      <AnimatePresence>
        {showResponse && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-2xl sm:text-3xl md:text-4xl text-center px-6 sm:px-8 py-5 sm:py-6 rounded-3xl"
              style={{
                fontFamily: "var(--font-romantic)",
                color: "#ffd700",
                background: "rgba(60, 10, 20, 0.8)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                boxShadow:
                  "0 0 40px rgba(255, 215, 0, 0.2), 0 0 80px rgba(255, 50, 80, 0.1)",
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {currentResponse}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
