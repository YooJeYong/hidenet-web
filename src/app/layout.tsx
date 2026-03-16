import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import StatusBar from "@/components/layout/StatusBar";
import MobileSidebarToggle from "@/components/layout/MobileSidebarToggle";
import { SplashScreen, AsciiHero } from "@/components/ClientShell";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "block",
});

export const metadata: Metadata = {
  title: "HIDENET // COMMUNITY TERMINAL",
  description: "Underground community network. Access granted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={jetbrainsMono.className}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="h-screen flex flex-col bg-[var(--bg)] overflow-hidden">
          <SplashScreen />
          <Header />
          <AsciiHero />
          <div className="flex flex-1 min-h-0">
            <main id="main-content" className="flex-1 min-h-0 flex flex-col">
              {children}
            </main>
            <MobileSidebarToggle />
          </div>
          <StatusBar />
        </div>
      </body>
    </html>
  );
}
