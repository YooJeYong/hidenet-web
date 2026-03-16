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
                aria-label={open ? "Close sidebar" : "Open sidebar"}
                aria-expanded={open}
                aria-controls="mobile-sidebar"
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
                    role="presentation"
                    aria-hidden="true"
                />
            )}

            {/* 사이드바: 데스크탑은 static, 모바일은 슬라이드 */}
            <div
                id="mobile-sidebar"
                className={`
                    h-full
                    max-md:fixed max-md:top-0 max-md:right-0 max-md:z-[150]
                    max-md:transition-transform max-md:duration-300 max-md:ease-in-out
                    ${open ? "max-md:translate-x-0" : "max-md:translate-x-full"}
                `}
            >
                <Sidebar />
            </div>
        </>
    );
}
