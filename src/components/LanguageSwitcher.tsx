"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import type { Locale } from "@/i18n";

const langs: { code: Locale; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useStore();

  return (
    <div className="fixed top-6 left-6 z-50 flex gap-2">
      {langs.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer"
          style={{
            background:
              locale === lang.code
                ? "rgba(200, 40, 70, 0.5)"
                : "rgba(80, 10, 25, 0.3)",
            backdropFilter: "blur(12px)",
            border:
              locale === lang.code
                ? "1px solid rgba(255, 100, 130, 0.5)"
                : "1px solid rgba(255, 100, 130, 0.15)",
            boxShadow:
              locale === lang.code
                ? "0 0 20px rgba(255, 50, 80, 0.3)"
                : "none",
            color:
              locale === lang.code
                ? "#ffd700"
                : "rgba(255, 200, 210, 0.6)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {lang.flag}
        </motion.button>
      ))}
    </div>
  );
}
