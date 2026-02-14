import { create } from "zustand";
import { type Locale, getTranslation, type TranslationKey } from "@/i18n";

export type Screen =
  | "entrance"
  | "love-letter"
  | "questions"
  | "gallery"
  | "finale";

interface LoveStore {
  // Locale
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;

  // Navigation
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  screenHistory: Screen[];
  goBack: () => void;
  restart: () => void;

  // Music
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  setMusicPlaying: (playing: boolean) => void;

  // Questions
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
  answerQuestion: (questionId: number) => void;

  // Effects
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;

  // Entrance
  hasEnteredSite: boolean;
  setHasEnteredSite: (entered: boolean) => void;
}

export const useStore = create<LoveStore>((set, get) => ({
  // Locale
  locale: "fr",
  setLocale: (locale) => set({ locale }),
  t: (key) => getTranslation(get().locale, key),

  // Navigation
  currentScreen: "entrance",
  screenHistory: [],
  setScreen: (screen) =>
    set((state) => ({
      currentScreen: screen,
      screenHistory: [...state.screenHistory, state.currentScreen],
    })),
  goBack: () =>
    set((state) => {
      const history = [...state.screenHistory];
      const prev = history.pop();
      if (!prev) return state;
      return { currentScreen: prev, screenHistory: history };
    }),
  restart: () =>
    set({
      currentScreen: "entrance",
      screenHistory: [],
      currentQuestion: 0,
      answeredQuestions: [],
      hasEnteredSite: false,
      showConfetti: false,
    }),

  // Music
  isMusicPlaying: false,
  toggleMusic: () =>
    set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),

  // Questions
  currentQuestion: 0,
  totalQuestions: 5,
  answeredQuestions: [],
  answerQuestion: (questionId) =>
    set((state) => ({
      answeredQuestions: [...state.answeredQuestions, questionId],
      currentQuestion: state.currentQuestion + 1,
      showConfetti: true,
    })),

  // Effects
  showConfetti: false,
  setShowConfetti: (show) => set({ showConfetti: show }),

  // Entrance
  hasEnteredSite: false,
  setHasEnteredSite: (entered) => set({ hasEnteredSite: entered }),
}));
