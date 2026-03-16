import Header from "@/components/layout/Header";
import StatusBar from "@/components/layout/StatusBar";
import MobileSidebarToggle from "@/components/layout/MobileSidebarToggle";
import { SplashScreen, AsciiHero } from "@/components/ClientShell";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-[var(--bg)] overflow-hidden">
      <SplashScreen />
      <Header />
      <AsciiHero />
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 min-h-0 flex flex-col">
          {children}
        </main>
        <MobileSidebarToggle />
      </div>
      <StatusBar />
    </div>
  );
}
