"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ASCII_ART, GLITCH_CHARS } from "@/constants/ascii";

export default function AsciiHero() {
    const [glitchedArt, setGlitchedArt] = useState(ASCII_ART);
    const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const applyGlitch = () => {
            const chars = ASCII_ART.split("");
            const glitchCount = Math.floor(Math.random() * 7) + 2;
            for (let i = 0; i < glitchCount; i++) {
                const idx = Math.floor(Math.random() * chars.length);
                if (chars[idx] !== "\n" && chars[idx] !== " ") {
                    chars[idx] =
                        GLITCH_CHARS[
                            Math.floor(Math.random() * GLITCH_CHARS.length)
                        ];
                }
            }
            if (!mountedRef.current) return;
            setGlitchedArt(chars.join(""));

            const restoreDelay = Math.random() * 100 + 50;
            if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
            restoreTimerRef.current = setTimeout(() => {
                if (mountedRef.current) setGlitchedArt(ASCII_ART);
            }, restoreDelay);
        };

        const scheduleGlitch = () => {
            const delay = Math.random() * 3000 + 1500;
            if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
            glitchTimerRef.current = setTimeout(() => {
                if (!mountedRef.current) return;
                applyGlitch();
                scheduleGlitch();
            }, delay);
        };
        scheduleGlitch();

        return () => {
            mountedRef.current = false;
            if (glitchTimerRef.current) {
                clearTimeout(glitchTimerRef.current);
                glitchTimerRef.current = null;
            }
            if (restoreTimerRef.current) {
                clearTimeout(restoreTimerRef.current);
                restoreTimerRef.current = null;
            }
        };
    }, []);

    return (
        <div className="px-3 pt-4 pb-4 md:px-6 md:pt-10 md:pb-8 border-b border-[var(--border)] bg-gradient-to-b from-[var(--bg-panel)] to-[var(--bg)] relative" role="banner" aria-label="HIDENET hero section">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <Link href="/feed" className="no-underline block">
                    <pre
                        className="text-[var(--green)] leading-[1.2] tracking-[0] shrink-0 text-[8px] md:text-[clamp(6px,1.1vw,14px)] w-full md:w-[53ch] cursor-pointer"
                        role="img"
                        aria-label="HIDENET ASCII art logo — go to home"
                        style={{
                            animation: "neon-flicker 3s infinite",
                            willChange: "text-shadow, opacity",
                        }}
                    >
                        {glitchedArt}
                    </pre>
                </Link>
            </div>

            <div className="mt-3 md:mt-5 flex flex-wrap gap-2 md:gap-3 items-center [animation:slideIn_0.5s_ease-out]">
                <span className="text-[10px] md:text-[12px] text-[var(--text-dim)] tracking-[2px] md:tracking-[3px]">
                    {"// UNDERGROUND COMMUNITY TERMINAL v2.4.1"}
                </span>
                <span className="text-[9px] md:text-[11px] px-1.5 md:px-2 py-0.5 border border-[var(--green-dark)] text-[var(--green-dim)] bg-[var(--green-faint)]" aria-label="Encrypted connection">
                    ENCRYPTED
                </span>
                <span className="text-[9px] md:text-[11px] px-1.5 md:px-2 py-0.5 border border-[rgba(0,204,255,0.3)] text-[rgba(0,204,255,0.7)] bg-[rgba(0,204,255,0.05)]" aria-label="Anonymous access">
                    ANONYMOUS
                </span>
                <span className="text-[9px] md:text-[11px] px-1.5 md:px-2 py-0.5 border border-[rgba(255,176,0,0.3)] text-[rgba(255,176,0,0.7)] bg-[rgba(255,176,0,0.05)]" aria-label="Decentralized network">
                    DECENTRALIZED
                </span>
            </div>
        </div>
    );
}
