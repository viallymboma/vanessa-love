"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Navigation() {
  const {
    currentScreen,
    hasEnteredSite,
    goBack,
    restart,
    setScreen,
    screenHistory,
    t,
  } = useStore();

  const showBackButton =
    currentScreen !== "entrance" && screenHistory.length > 0;
  const showGalleryButton = currentScreen === "finale";
  const showRestartButton =
    hasEnteredSite && currentScreen !== "entrance";

  if (!hasEnteredSite) return null;

  // Hide nav when gallery lightbox could be open - nav sits at top-left instead of bottom
  // to avoid overlapping with thumbnail strip
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 sm:gap-3">
      <AnimatePresence>
        {showBackButton && (
          <motion.button
            key="back"
            onClick={goBack}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-elegant)",
              fontWeight: 600,
              background: "rgba(80, 10, 25, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 100, 130, 0.2)",
              color: "rgba(255, 200, 210, 0.8)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{
              background: "rgba(120, 15, 35, 0.5)",
              boxShadow: "0 4px 25px rgba(255, 50, 80, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            ← 
            {/* {t("nav.back")} */}
          </motion.button>
        )}

        {showGalleryButton && (
          <motion.button
            key="gallery"
            onClick={() => setScreen("gallery")}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-elegant)",
              fontWeight: 600,
              background: "rgba(155, 27, 48, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 100, 130, 0.3)",
              color: "#ffd700",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{
              boxShadow: "0 4px 30px rgba(255, 50, 80, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            📸 {t("nav.gallery")}
          </motion.button>
        )}

        {showRestartButton && (
          <motion.button
            key="restart"
            onClick={restart}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-elegant)",
              fontWeight: 600,
              background: "rgba(80, 10, 25, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 100, 130, 0.2)",
              color: "rgba(255, 200, 210, 0.7)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{
              background: "rgba(120, 15, 35, 0.5)",
              boxShadow: "0 4px 25px rgba(255, 50, 80, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            ↺ 
            {/* {t("nav.restart")} */}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
