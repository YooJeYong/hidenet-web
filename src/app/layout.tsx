import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./styles/globals.css";

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
        {children}
      </body>
    </html>
  );
}
