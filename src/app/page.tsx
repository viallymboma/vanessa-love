"use client";

import dynamic from "next/dynamic";
import { useStore } from "@/store/useStore";

const FloatingHearts = dynamic(() => import("@/components/FloatingHearts"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), {
  ssr: false,
});
const Confetti = dynamic(() => import("@/components/Confetti"), {
  ssr: false,
});
const EntranceScreen = dynamic(() => import("@/components/EntranceScreen"), {
  ssr: false,
});
const LoveLetterScreen = dynamic(
  () => import("@/components/LoveLetterScreen"),
  { ssr: false }
);
const QuestionsScreen = dynamic(
  () => import("@/components/QuestionsScreen"),
  { ssr: false }
);
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"), {
  ssr: false,
});
const FinaleScreen = dynamic(() => import("@/components/FinaleScreen"), {
  ssr: false,
});
const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
});
const LanguageSwitcher = dynamic(
  () => import("@/components/LanguageSwitcher"),
  { ssr: false }
);

export default function Home() {
  const { hasEnteredSite } = useStore();

  return (
    <main className="relative min-h-screen min-h-dvh">
      <CustomCursor />
      <FloatingHearts />
      <Confetti />
      <LanguageSwitcher />

      {hasEnteredSite && <MusicPlayer />}
      {hasEnteredSite && <Navigation />}

      <EntranceScreen />

      <div className="relative z-20">
        <LoveLetterScreen />
        <QuestionsScreen />
        <FinaleScreen />
      </div>

      <PhotoGallery />
    </main>
  );
}
