"use client";
import { useEffect, useState } from "react";
import { SPLASH_ASCII, LOAD_STEPS } from "@/constants";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // 스텝 타이핑
        const stepTimer = setInterval(() => {
            setStepIndex((i) => {
                if (i < LOAD_STEPS.length - 1) return i + 1;
                clearInterval(stepTimer);
                return i;
            });
        }, 320);

        // 프로그레스 바
        const progTimer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(progTimer);
                    return 100;
                }
                return p + 2;
            });
        }, 28);

        // 페이드아웃 후 언마운트
        const fadeTimer = setTimeout(() => setFadeOut(true), 1700);
        const hideTimer = setTimeout(() => setVisible(false), 2200);

        return () => {
            clearInterval(stepTimer);
            clearInterval(progTimer);
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg)]"
            style={{
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 0.5s ease-out",
            }}
        >
            {/* 스캔라인 */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.13) 0px, rgba(0,0,0,0.13) 1px, transparent 1px, transparent 3px)",
                }}
            />

            {/* 비네트 */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
                }}
            />

            {/* ASCII + 로딩을 하나의 플로우로 — ASCII 기준 아래에 로딩 배치 */}
            <div className="flex flex-col items-center gap-6 md:gap-10 px-4">
                <pre
                    className="text-[var(--green)] leading-[1.2] tracking-[0] text-center text-[clamp(4px,2.2vw,8px)] md:text-[clamp(6px,1.1vw,14px)]"
                    style={{
                        textShadow:
                            "0 0 8px var(--green), 0 0 20px var(--green), 0 0 50px var(--green-dim)",
                        animation: "neon-flicker 3s infinite",
                    }}
                >
                    {SPLASH_ASCII}
                </pre>

                <div className="flex flex-col items-center gap-3 w-[240px] md:w-[280px]">
                    <div className="flex flex-col gap-1 w-full">
                        {LOAD_STEPS.slice(0, stepIndex + 1).map((step, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-[9px] md:text-[11px]"
                            >
                                <span className="text-[var(--green-dim)]">
                                    {i < stepIndex ? "[ OK ]" : "[    ]"}
                                </span>
                                <span
                                    style={{
                                        color:
                                            i === stepIndex
                                                ? "var(--green)"
                                                : "var(--text-dim)",
                                    }}
                                >
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[2px] bg-[var(--border)] relative overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-[var(--green)]"
                            style={{
                                width: `${progress}%`,
                                transition: "width 0.03s linear",
                                boxShadow: "0 0 8px var(--green)",
                            }}
                        />
                    </div>
                    <div className="text-[10px] text-[var(--text-dim)] tracking-[2px]">
                        {progress}%
                    </div>
                </div>
            </div>
        </div>
    );
}
