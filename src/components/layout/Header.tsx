"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/navigation";
import { formatUptime } from "@/lib/format";
import { useAuthStore } from "@/store/auth";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const uptimeRef = useRef(0);
    const timeElRef = useRef<HTMLSpanElement>(null);
    const uptimeElRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            if (timeElRef.current) {
                timeElRef.current.textContent = now.toLocaleTimeString("en-US", { hour12: false });
            }
            uptimeRef.current += 1;
            if (uptimeElRef.current) {
                uptimeElRef.current.textContent = formatUptime(uptimeRef.current);
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <header className="border-b border-[var(--border)] bg-[var(--bg-panel)] sticky top-0 z-[100] shadow-[0_0_20px_rgba(0,255,65,0.05)]">
            {/* 상단 바 — 맥 버튼 + 타이틀 + 시계 */}
            <div className="flex items-center px-3 md:px-4 py-1.5 md:py-2 border-b border-[var(--border)] bg-[var(--bg-dark)]">
                <div
                    className="flex gap-1.5 md:gap-2 mr-3 md:mr-4"
                    aria-hidden="true"
                >
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--mac-red)] shadow-[0_0_4px_var(--mac-red)]" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--mac-yellow)] shadow-[0_0_4px_var(--mac-yellow)]" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--mac-green)] shadow-[0_0_4px_var(--mac-green)]" />
                </div>
                <span className="flex-1 text-center text-[0.5625rem] md:text-[0.6875rem] text-[var(--text-dim)] tracking-[1px] md:tracking-[2px]">
                    <span className="hidden md:inline">
                        HIDENET — zsh — 80×24
                    </span>
                    <span className="md:hidden">HIDENET</span>
                </span>
                <span
                    ref={timeElRef}
                    className="text-[0.5625rem] md:text-[0.6875rem] text-[var(--text-dim)]"
                    aria-live="off"
                    aria-label="Current time"
                />
            </div>

            {/* 네비게이션 바 */}
            <div className="flex items-center px-3 md:px-6 py-2 md:py-2.5 justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    {/* 프롬프트 — 모바일에서 축약 */}
                    <span className="text-[0.6875rem] md:text-[0.8125rem] text-[var(--text-dim)] shrink-0">
                        <span className="text-[var(--green)]">root</span>
                        <span className="text-[var(--text-dim)]">@</span>
                        <span className="text-[var(--cyan)]">hidenet</span>
                        <span className="text-[var(--text-dim)] hidden md:inline">
                            :~$
                        </span>
                        <span className="text-[var(--text-dim)] md:hidden">
                            $
                        </span>
                    </span>

                    {/* 네비 — 모바일에서 cmd 숨김, 라벨만 */}
                    <nav
                        className="flex gap-0.5 md:gap-1 overflow-x-auto"
                        aria-label="Main navigation"
                    >
                        {NAV_ITEMS.map(({ cmd, label, href }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`group bg-transparent px-2 md:px-3 py-1 cursor-pointer text-[0.625rem] md:text-[0.75rem] tracking-[1px] transition-all duration-150 font-[inherit] border-b no-underline shrink-0 ${
                                        isActive
                                            ? "text-[var(--green)] border-b-[color:var(--green)] [text-shadow:0_0_8px_var(--green)]"
                                            : "text-[var(--text-dim)] border-transparent hover:text-[var(--green)] hover:border-b-[color:var(--green)] hover:[text-shadow:0_0_8px_var(--green)]"
                                    }`}
                                >
                                    <span
                                        className={`text-[0.5rem] md:text-[0.625rem] hidden md:block ${isActive ? "text-[var(--green-dim)]" : "text-[var(--text-dim)]"}`}
                                    >
                                        {cmd}
                                    </span>
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* 우측 정보 — 모바일에서 간소화 */}
                <div className="flex items-center gap-2 md:gap-5 text-[0.5625rem] md:text-[0.6875rem] text-[var(--text-dim)] shrink-0">
                    <span className="hidden md:inline">
                        UPTIME:{" "}
                        <span className="text-[var(--green)]" ref={uptimeElRef}>
                            {formatUptime(0)}
                        </span>
                    </span>
                    <span className="hidden md:inline">
                        NODES:{" "}
                        <span className="text-[var(--green)]">1,337</span>
                    </span>
                    {user ? (
                        <button
                            onClick={async () => {
                                await logout();
                                router.push("/login");
                            }}
                            className="px-1.5 md:px-2.5 py-0.5 md:py-1 border border-[var(--mac-red)] text-[var(--mac-red)] text-[0.5625rem] md:text-[0.6875rem] cursor-pointer tracking-[1px] bg-transparent font-[inherit]"
                        >
                            [LOGOUT]
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            aria-label="Connect to network"
                            className="px-1.5 md:px-2.5 py-0.5 md:py-1 border border-[var(--green)] text-[var(--green)] text-[0.5625rem] md:text-[0.6875rem] cursor-pointer tracking-[1px] [animation:pulse-green_2s_infinite] bg-transparent font-[inherit] no-underline"
                        >
                            [CONNECT]
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
