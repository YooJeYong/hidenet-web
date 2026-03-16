"use client";
import { useRef, useEffect } from "react";

interface ReplyInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export default function ReplyInput({
    value,
    onChange,
    onSubmit,
    isSubmitting,
}: ReplyInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="flex gap-2 md:gap-2.5 items-center">
            <span className="text-[0.6875rem] md:text-[0.75rem] text-[var(--text-dim)]">
                reply&gt;
            </span>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type your response..."
                disabled={isSubmitting}
                aria-label="Reply content"
                className="bg-transparent border-none border-b border-[var(--border)] text-[var(--green)] font-[inherit] text-[0.6875rem] md:text-[0.75rem] outline-none py-1 flex-1 md:flex-none md:w-[18.75rem] caret-[var(--green)] placeholder:text-[var(--text-dim)] disabled:opacity-50"
            />
            <button
                onClick={onSubmit}
                disabled={isSubmitting || !value.trim()}
                aria-label="Send reply"
                className="bg-transparent border border-[var(--border-bright)] text-[var(--green-dim)] px-2 md:px-2.5 py-0.5 cursor-pointer text-[0.5625rem] md:text-[0.6875rem] font-[inherit] shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "..." : "SEND"}
            </button>
        </div>
    );
}
