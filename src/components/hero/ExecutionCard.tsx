"use client";

export default function ExecutionCard() {
    return (
        <div
            className="relative shrink-0 w-[220px] h-[110px]"
            style={{ filter: "drop-shadow(0 0 6px var(--green-glow))" }}
        >
            <div className="absolute top-0 left-0 right-0 flex items-center">
                <div className="h-[1px] w-4 bg-[var(--green)]" />
                <span
                    className="px-2 text-[10px] tracking-[3px] text-[var(--green)] uppercase whitespace-nowrap"
                    style={{ fontFamily: "inherit" }}
                >
                    Execution😵
                </span>
                <div className="h-[1px] flex-1 bg-[var(--green)]" />
            </div>

            <div className="absolute left-0 top-[9px] bottom-0 w-[1px] bg-[var(--green)]" />
            <div className="absolute right-0 top-[9px] bottom-0 w-[1px] bg-[var(--green)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--green)]" />

            <div className="absolute inset-0 flex items-center justify-center">
                <span
                    className="text-[13px] tracking-[2px] text-[var(--green)]"
                    style={{
                        textShadow: "0 0 8px var(--green), 0 0 20px var(--green-dim)",
                        fontFamily: "inherit",
                    }}
                >
                    {"{{player ID}}"}
                </span>
            </div>
        </div>
    );
}
