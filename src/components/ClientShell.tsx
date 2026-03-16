"use client";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("./hero/SplashScreen"), { ssr: false });
const AsciiHero = dynamic(() => import("./hero/AsciiHero"), { ssr: false });

export { SplashScreen, AsciiHero };
