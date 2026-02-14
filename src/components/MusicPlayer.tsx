"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";

const playlist = [
  "/music/Aldy_Santos_-_A_Thousand_Years_-_Christina_Perri_Piano_Cover_(mp3.pm).mp3",
  "/music/Ceresia_-_Thinking_Out_Loud_Ed_Sheeran_cover_(mp3.pm).mp3",
  "/music/Edd_Sheeran_-_Perfect_(mp3.pm).mp3",
];

export default function MusicPlayer() {
  const { isMusicPlaying, toggleMusic, setMusicPlaying } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIndexRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(playlist[0]);
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    const playNext = () => {
      trackIndexRef.current =
        (trackIndexRef.current + 1) % playlist.length;
      audio.src = playlist[trackIndexRef.current];
      audio.play().catch(() => {});
    };

    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("ended", playNext);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isMusicPlaying]);

  const handleToggle = () => {
    if (!isMusicPlaying) {
      setMusicPlaying(true);
    } else {
      toggleMusic();
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: "rgba(155, 27, 48, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 100, 130, 0.3)",
        boxShadow: isMusicPlaying
          ? "0 0 25px rgba(255, 50, 80, 0.5), 0 0 50px rgba(255, 50, 80, 0.2)"
          : "0 0 15px rgba(255, 50, 80, 0.2)",
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      animate={
        isMusicPlaying
          ? {
              boxShadow: [
                "0 0 25px rgba(255, 50, 80, 0.5), 0 0 50px rgba(255, 50, 80, 0.2)",
                "0 0 35px rgba(255, 50, 80, 0.7), 0 0 70px rgba(255, 50, 80, 0.3)",
                "0 0 25px rgba(255, 50, 80, 0.5), 0 0 50px rgba(255, 50, 80, 0.2)",
              ],
            }
          : {}
      }
      transition={
        isMusicPlaying ? { duration: 1.5, repeat: Infinity } : undefined
      }
    >
      <span className="text-lg sm:text-2xl">
        {isMusicPlaying ? "🎵" : "🔇"}
      </span>
    </motion.button>
  );
}
