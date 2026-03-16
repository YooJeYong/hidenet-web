"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const ADS = [
    {
        headline: "★ PROXY_CHAIN v4.2 — 99.9% UNDETECTABLE ★",
        sub: "멀티홉 프록시 체인. 무제한 노드. 지금 연결하세요.",
        cta: "CONNECT",
        color: "var(--cyan)",
    },
    {
        headline: "◆ NEURAL_CRYPT — END-TO-END ENCRYPTION ◆",
        sub: "군사급 암호화. 양자 컴퓨터 내성. 0일 로그 정책.",
        cta: "ENCRYPT",
        color: "var(--green)",
    },
    {
        headline: "▶ GHOST_VPN — VANISH FROM THE GRID ▶",
        sub: "DPI 우회. 완전 익명. 디지털 흔적 제로.",
        cta: "ACTIVATE",
        color: "#ff00c8",
    },
];

const NOISE_CHARS = "█▓▒░╳╱╲┃━┣┫╋▪▫◻◼⬡⬢∷≡¤§¶†‡";

function generateNoiseLine(len: number) {
    return Array.from({ length: len }, () =>
        NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
    ).join("");
}

export default function AdBanner() {
    const [adIndex, setAdIndex] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [noiseLines, setNoiseLines] = useState<string[]>([]);
    const noiseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const nextAd = useCallback(() => {
        setIsGlitching(true);

        // 전환 중 노이즈 텍스트를 빠르게 갱신
        noiseTimerRef.current = setInterval(() => {
            setNoiseLines([
                generateNoiseLine(40),
                generateNoiseLine(35),
                generateNoiseLine(28),
                generateNoiseLine(42),
                generateNoiseLine(30),
            ]);
        }, 50);

        setTimeout(() => {
            if (noiseTimerRef.current) clearInterval(noiseTimerRef.current);
            setAdIndex(i => (i + 1) % ADS.length);
            setNoiseLines([]);
            setIsGlitching(false);
        }, 500);
    }, []);

    useEffect(() => {
        const id = setInterval(nextAd, 5000);
        return () => {
            clearInterval(id);
            if (noiseTimerRef.current) clearInterval(noiseTimerRef.current);
        };
    }, [nextAd]);

    const ad = ADS[adIndex];

    return (
        <div
            className="flex-1 max-w-[500px] min-w-[250px] h-full relative overflow-hidden border cursor-pointer"
            style={{
                borderColor: `color-mix(in srgb, ${ad.color} 40%, transparent)`,
                animation: "neon-border-pulse 3s ease-in-out infinite",
                background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,10,10,0.95) 100%)",
            }}
        >
            {/* 스캔라인 오버레이 */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)",
                }}
            />

            {/* 글리치 시 RGB 분리 레이어 */}
            {isGlitching && (
                <>
                    <div
                        className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                        style={{
                            background: "rgba(255, 0, 0, 0.08)",
                            transform: `translateX(${Math.random() * 6 - 3}px)`,
                        }}
                    />
                    <div
                        className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                        style={{
                            background: "rgba(0, 0, 255, 0.08)",
                            transform: `translateX(${Math.random() * -6 + 3}px)`,
                        }}
                    />
                </>
            )}

            {/* AD 라벨 */}
            <div className="absolute top-1.5 right-2 z-20">
                <span className="text-[0.5rem] tracking-[2px] text-[var(--text-dim)] opacity-50">AD</span>
            </div>

            {/* 글리치 노이즈 오버레이 */}
            {isGlitching && noiseLines.length > 0 && (
                <div className="absolute inset-0 z-40 flex flex-col justify-center px-3 overflow-hidden">
                    {noiseLines.map((line, i) => (
                        <div
                            key={i}
                            className="text-[0.6875rem] leading-[1.6] overflow-hidden whitespace-nowrap"
                            style={{
                                color: i % 2 === 0 ? "var(--cyan)" : "var(--green)",
                                opacity: 0.6 + Math.random() * 0.4,
                                transform: `translateX(${Math.random() * 10 - 5}px)`,
                                textShadow: `0 0 4px ${i % 2 === 0 ? "var(--cyan)" : "var(--green)"}`,
                            }}
                        >
                            {line}
                        </div>
                    ))}
                </div>
            )}

            {/* 콘텐츠 */}
            <div
                className="relative z-10 flex flex-col justify-between h-full px-4 py-3"
                style={{
                    opacity: isGlitching ? 0 : 1,
                    transition: isGlitching ? "none" : "opacity 0.15s ease-in",
                }}
            >
                {/* 전광판 스크롤 헤드라인 */}
                <div className="overflow-hidden whitespace-nowrap mb-2">
                    <span
                        className="inline-block text-[0.75rem] tracking-[2px] font-bold"
                        style={{
                            color: ad.color,
                            textShadow: `0 0 8px ${ad.color}, 0 0 20px ${ad.color}`,
                            animation: "marquee 8s linear infinite",
                        }}
                    >
                        {ad.headline}
                    </span>
                </div>

                {/* 설명 텍스트 */}
                <p className="text-[0.6875rem] text-[var(--text-dim)] leading-[1.5] mb-2">
                    {ad.sub}
                </p>

                {/* CTA + 인디케이터 */}
                <div className="flex items-center justify-between">
                    <span
                        className="text-[0.625rem] tracking-[2px] px-2.5 py-0.5 border"
                        style={{
                            color: ad.color,
                            borderColor: ad.color,
                            textShadow: `0 0 6px ${ad.color}`,
                            boxShadow: `0 0 8px color-mix(in srgb, ${ad.color} 30%, transparent)`,
                        }}
                    >
                        [{ad.cta}]
                    </span>
                    <div className="flex gap-1">
                        {ADS.map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 transition-all duration-300"
                                style={{
                                    background: i === adIndex ? ad.color : "var(--border)",
                                    boxShadow: i === adIndex ? `0 0 4px ${ad.color}` : "none",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
