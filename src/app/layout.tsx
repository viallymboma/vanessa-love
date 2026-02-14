import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Love, Vanessa 💖",
  description:
    "Happy Valentine's Day & Happy 1 Year Anniversary - A love letter from my heart to yours",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
