"use client";
import { useEffect, useRef, useState } from "react";
import { SPLASH_ASCII, LOAD_STEPS } from "@/constants/splash";

export default function SplashScreen() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        let currentStep = 0;
        let currentProgress = 0;

        // 스텝 타이핑
        const stepTimer = setInterval(() => {
            if (!mountedRef.current) return;
            if (currentStep >= LOAD_STEPS.length - 1) {
                clearInterval(stepTimer);
                return;
            }
            currentStep += 1;
            setStepIndex(currentStep);
        }, 320);

        // 프로그레스 바
        const progTimer = setInterval(() => {
            if (!mountedRef.current) return;
            if (currentProgress >= 100) {
                clearInterval(progTimer);
                return;
            }
            currentProgress = Math.min(currentProgress + 2, 100);
            setProgress(currentProgress);
        }, 28);

        // 페이드아웃 후 언마운트
        const fadeTimer = setTimeout(() => {
            if (mountedRef.current) setFadeOut(true);
        }, 1700);
        const hideTimer = setTimeout(() => {
            if (mountedRef.current) setVisible(false);
        }, 2200);

        return () => {
            mountedRef.current = false;
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
            role="status"
            aria-label="Loading HIDENET"
            style={{
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 0.5s ease-out",
            }}
        >
            {/* 스캔라인 */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.13) 0px, rgba(0,0,0,0.13) 1px, transparent 1px, transparent 3px)",
                }}
            />

            {/* 비네트 */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
                }}
            />

            {/* ASCII + 로딩을 하나의 플로우로 — ASCII 기준 아래에 로딩 배치 */}
            <div className="flex flex-col items-center gap-6 md:gap-10 px-4">
                <pre
                    className="text-[var(--green)] leading-[1.2] tracking-[0] text-center text-[clamp(4px,2.2vw,8px)] md:text-[clamp(6px,1.1vw,14px)]"
                    aria-label="HIDENET logo"
                    role="img"
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
                    <div className="w-full h-[2px] bg-[var(--border)] relative overflow-hidden" role="progressbar" aria-label="Boot progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
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
