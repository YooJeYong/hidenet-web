"use client";
import { useState, useEffect, useRef } from "react";
import { MOCK_USER, MOCK_TRENDING, MOCK_LOGS } from "@/mocks/sidebar";

const SYS_KEYS = ["CPU", "MEM", "NET_IN", "NET_OUT"] as const;

export default function Sidebar() {
    const [stats, setStats] = useState(() => SYS_KEYS.map(() => 0));
    const targetRef = useRef<number[]>([]);
    const animatingRef = useRef(false);

    useEffect(() => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const targets = SYS_KEYS.map(() => Math.floor(Math.random() * 60) + 15);
        targetRef.current = targets;

        const current = SYS_KEYS.map(() => 0);
        const id = setInterval(() => {
            let allDone = true;
            for (let i = 0; i < current.length; i++) {
                if (current[i] !== targets[i]) {
                    const diff = targets[i] - current[i];
                    const step = Math.ceil(Math.abs(diff) * 0.15) || 1;
                    const noise = Math.floor(Math.random() * 5) - 2;
                    current[i] = Math.max(0, Math.min(99, current[i] + (diff > 0 ? step : -step) + noise));
                    if (Math.abs(current[i] - targets[i]) <= 2) {
                        current[i] = targets[i];
                    }
                    allDone = false;
                }
            }
            setStats([...current]);
            if (allDone) clearInterval(id);
        }, 60);

        return () => clearInterval(id);
    }, []);

    return (
        <aside className="w-60 h-full shrink-0 border-l border-[var(--border)] bg-[var(--bg-panel)] flex flex-col min-h-0" role="complementary" aria-label="System sidebar">
            {/* 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto min-h-0">
            {/* MY_STATUS */}
            <div className="px-4 py-3.5 border-b border-[var(--border)]" role="region" aria-label="User status">
                <div className="text-[0.625rem] tracking-[2px] text-[var(--text-dim)] mb-3">── MY_STATUS ──</div>
                <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)] shrink-0" />
                    <span className="text-[0.8125rem] text-[var(--green)]">{MOCK_USER.alias}</span>
                </div>
                <div className="flex flex-col gap-1.5 text-[0.6875rem]">
                    <div className="flex justify-between">
                        <span className="text-[var(--text-dim)]">POINTS</span>
                        <span className="text-[var(--mac-yellow)]">{MOCK_USER.points.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[var(--text-dim)]">QUOTA</span>
                        <div className="flex items-center gap-1.5">
                            <div className="flex gap-px">
                                {Array.from({ length: MOCK_USER.quota.max }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-1.5"
                                        style={{
                                            background: i < MOCK_USER.quota.max - MOCK_USER.quota.used
                                                ? "var(--green)"
                                                : "var(--border)",
                                            boxShadow: i < MOCK_USER.quota.max - MOCK_USER.quota.used
                                                ? "0 0 4px var(--green)"
                                                : "none",
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-[0.625rem] text-[var(--green-dim)]">
                                {MOCK_USER.quota.max - MOCK_USER.quota.used}/{MOCK_USER.quota.max}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SYS_MONITOR */}
            <div className="px-4 py-3.5 border-b border-[var(--border)]" role="region" aria-label="System monitor">
                <div className="text-[0.625rem] tracking-[2px] text-[var(--text-dim)] mb-3">── SYS_MONITOR ──</div>
                {SYS_KEYS.map((key, i) => {
                    const v = stats[i];
                    const color = v > 80 ? "var(--mac-red)" : v > 60 ? "var(--mac-yellow)" : "var(--green)";
                    return (
                        <div key={key} className="mb-2.5">
                            <div className="flex justify-between text-[0.6875rem] mb-0.5">
                                <span className="text-[var(--text-dim)]">{key}</span>
                                <span className="font-bold" style={{ color }}>{`${v}%`}</span>
                            </div>
                            <div className="h-[3px] bg-[var(--border)] overflow-hidden" role="progressbar" aria-label={key} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
                                <div
                                    className="h-full"
                                    style={{
                                        width: `${v}%`,
                                        background: color,
                                        boxShadow: `0 0 6px ${color}`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* TRENDING */}
            <div className="px-4 py-3.5 border-b border-[var(--border)]" role="region" aria-label="Trending threads">
                <div className="text-[0.625rem] tracking-[2px] text-[var(--text-dim)] mb-2.5">── TRENDING ──</div>
                {MOCK_TRENDING.map((thread, i) => (
                    <div
                        key={thread.id}
                        className="flex items-start gap-2 px-1 py-1.5 mb-0.5 transition-all duration-150 hover:bg-[var(--green-faint)] hover:pl-2"
                    >
                        <span className="text-[0.625rem] text-[var(--text-dim)] pt-0.5 shrink-0">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[0.75rem] text-[var(--text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap">
                                {thread.title}
                            </p>
                            <div className="flex gap-2 text-[0.5625rem] text-[var(--text-dim)]">
                                <span>{thread.board}</span>
                                <span>↩ {thread.replies}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RECENT_LOG */}
            <div className="px-4 py-3.5" role="log" aria-label="Recent activity log">
                <div className="text-[0.625rem] tracking-[2px] text-[var(--text-dim)] mb-2.5">── RECENT_LOG ──</div>
                {MOCK_LOGS.map((log, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-2 text-[0.6875rem] leading-[1.4]">
                        <span className="text-[var(--green-dim)] shrink-0">›</span>
                        <div className="min-w-0">
                            <span className="text-[var(--cyan-dim)]">{log.alias}</span>
                            <span className="text-[var(--text-dim)]"> {log.action} in </span>
                            <span className="text-[var(--green-dim)]">{log.board}</span>
                            <span className="text-[var(--text-dim)] text-[0.5625rem] ml-1.5">{log.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            </div>

            {/* 하단 바 */}
            <div className="px-4 py-2.5 border-t border-[var(--border)] text-[0.625rem] text-[var(--text-dim)] bg-[var(--bg-dark)]">
                <div className="flex justify-between">
                    <span>PING: <span className="text-[var(--green)]">12ms</span></span>
                    <span>PKT LOSS: <span className="text-[var(--green)]">0%</span></span>
                </div>
            </div>
        </aside>
    );
}
