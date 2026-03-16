"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function MobileSidebarToggle() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 모바일 토글 버튼 */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden fixed bottom-12 right-3 z-[200] w-9 h-9 flex items-center justify-center border border-[var(--border-bright)] bg-[var(--bg-dark)] text-[var(--green)] text-[0.75rem] font-[inherit] cursor-pointer"
                style={{ boxShadow: "0 0 8px var(--green-glow)" }}
            >
                {open ? "✕" : "☰"}
            </button>

            {/* 모바일 오버레이 */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-[149] bg-black/60"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* 데스크탑: 항상 표시 / 모바일: 슬라이드 */}
            <div className="hidden md:block h-full">
                <Sidebar />
            </div>
            <div
                className={`
                    md:hidden fixed top-0 right-0 h-full z-[150]
                    transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <Sidebar />
            </div>
        </>
    );
}
