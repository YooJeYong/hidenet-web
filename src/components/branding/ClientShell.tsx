"use client";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("./SplashScreen"), { ssr: false });
const AsciiHero = dynamic(() => import("./AsciiHero"), { ssr: false });

export { SplashScreen, AsciiHero };
