"use client";
import { useEffect, useState } from "react";
import { LOG_MESSAGES } from "@/constants/statusbar";

export default function StatusBar() {
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setLogIndex(i => (i + 1) % LOG_MESSAGES.length);
        }, 3500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-1.5 flex items-center gap-5 text-[0.6875rem] text-[var(--text-dim)] sticky bottom-0 z-50" role="status" aria-label="System status bar">
            <span className="text-[var(--green)] shrink-0" aria-hidden="true">●</span>
            <span className="text-[var(--text-dim)] shrink-0">SYS LOG:</span>
            <span className="text-[var(--green-dim)] overflow-hidden text-ellipsis whitespace-nowrap flex-1 [animation:fadeIn_0.4s_ease-out]" aria-live="polite" aria-atomic="true">
                {LOG_MESSAGES[logIndex]}
            </span>
            <div className="flex gap-4 shrink-0">
                <span>THREADS: <span className="text-[var(--green)]">6</span></span>
                <span>USERS: <span className="text-[var(--green)]">10</span></span>
                <span className="text-[var(--text-dim)]">UTF-8 | LF | TS</span>
            </div>
        </div>
    );
}
