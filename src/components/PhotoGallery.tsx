"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useStore } from "@/store/useStore";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { TranslationKey } from "@/i18n";

const totalPhotos = 79;

const photos = Array.from(
  { length: totalPhotos },
  (_, i) => `/photos/love-${i + 1}.jpeg`
);

function Photo3D({
  src,
  index,
  caption,
  onClick,
}: {
  src: string;
  index: number;
  caption: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "0 10px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 50, 80, 0.15)",
        }}
        whileHover={{
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 50, 80, 0.3)",
        }}
      >
        <div
          className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid rgba(255, 100, 130, 0.2)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />

        <Image
          src={src}
          alt={`Our love - photo ${index + 1}`}
          width={400}
          height={500}
          className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <motion.div
          className="absolute inset-0 flex items-end justify-center p-3 sm:p-4 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(40, 5, 15, 0.9) 0%, transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p
            className="text-sm sm:text-base text-rose-100 text-center"
            style={{ fontFamily: "var(--font-romantic)" }}
          >
            {caption}
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 50, 80, 0.15) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function Lightbox({
  currentIndex,
  onClose,
  onNavigate,
}: {
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= photos.length) return;
      setDirection(index > currentIndex ? 1 : -1);
      onNavigate(index);
    },
    [currentIndex, onNavigate]
  );

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext, onClose]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailRef.current) return;
    const activeThumb = thumbnailRef.current.children[
      currentIndex
    ] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col"
      style={{
        background: "rgba(10, 0, 5, 0.95)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0">
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-base sm:text-lg cursor-pointer"
          style={{
            background: "rgba(155, 27, 48, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 100, 130, 0.25)",
          }}
          onClick={onClose}
        >
          ✕
        </button>
        <span
          className="text-sm text-rose-200/50"
          style={{ fontFamily: "var(--font-elegant)" }}
        >
          {currentIndex + 1} / {photos.length}
        </span>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-0 px-2 sm:px-4">
        {/* Left arrow */}
        {currentIndex > 0 && (
          <motion.button
            className="absolute left-2 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl cursor-pointer"
            style={{
              background: "rgba(80, 10, 25, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 100, 130, 0.2)",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
            onClick={goPrev}
            whileHover={{ scale: 1.1, background: "rgba(155, 27, 48, 0.6)" }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.button>
        )}

        {/* Right arrow */}
        {currentIndex < photos.length - 1 && (
          <motion.button
            className="absolute right-2 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl cursor-pointer"
            style={{
              background: "rgba(80, 10, 25, 0.5)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 100, 130, 0.2)",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
            onClick={goNext}
            whileHover={{ scale: 1.1, background: "rgba(155, 27, 48, 0.6)" }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.button>
        )}

        {/* Animated image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center px-12 sm:px-16"
          >
            <Image
              src={photos[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              width={1200}
              height={900}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{
                boxShadow:
                  "0 0 60px rgba(255, 50, 80, 0.2), 0 0 120px rgba(255, 50, 80, 0.08)",
              }}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 py-3 sm:py-4 px-2">
        <div
          ref={thumbnailRef}
          className="thumbnail-strip flex gap-1.5 sm:gap-2 overflow-x-auto px-2 sm:px-4 justify-start"
        >
          {photos.map((src, i) => (
            <button
              key={i}
              className="shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all duration-200"
              style={{
                width: i === currentIndex ? 56 : 48,
                height: i === currentIndex ? 56 : 48,
                border:
                  i === currentIndex
                    ? "2px solid rgba(255, 215, 0, 0.8)"
                    : "1px solid rgba(255, 100, 130, 0.15)",
                boxShadow:
                  i === currentIndex
                    ? "0 0 15px rgba(255, 215, 0, 0.3)"
                    : "none",
                opacity: i === currentIndex ? 1 : 0.5,
              }}
              onClick={() => goTo(i)}
            >
              <Image
                src={src}
                alt={`Thumb ${i + 1}`}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const { currentScreen, setScreen, t } = useStore();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (currentScreen !== "gallery") return null;

  return (
    <motion.div
      className="min-h-screen px-3 sm:px-4 md:px-8 py-16 sm:py-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-7xl mb-3 sm:mb-4"
          style={{
            fontFamily: "var(--font-romantic)",
            background:
              "linear-gradient(135deg, #ff6b8a, #ffd700, #ff6b8a)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
            animation: "shimmer 4s ease infinite",
          }}
        >
          {t("gallery.title")}
        </h2>
        <p
          className="text-rose-200/60 text-sm sm:text-base md:text-lg"
          style={{ fontFamily: "var(--font-elegant)", fontWeight: 300 }}
        >
          {t("gallery.subtitle")}
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {photos.map((src, i) => {
          const captionKey =
            `gallery.caption.${i % 10}` as TranslationKey;
          return (
            <Photo3D
              key={i}
              src={src}
              index={i}
              caption={t(captionKey)}
              onClick={() => setLightboxIndex(i)}
            />
          );
        })}
      </div>

      {/* Continue to finale */}
      <motion.div
        className="flex justify-center mt-12 sm:mt-16 pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.button
          className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white cursor-pointer relative overflow-hidden"
          style={{
            fontFamily: "var(--font-elegant)",
            fontWeight: 600,
            background:
              "linear-gradient(135deg, rgba(200, 40, 70, 0.5), rgba(155, 27, 48, 0.5))",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 100, 130, 0.4)",
            boxShadow: "0 0 30px rgba(255, 50, 80, 0.3)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 50px rgba(255, 50, 80, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen("finale")}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          />
          {t("gallery.button")}
        </motion.button>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
