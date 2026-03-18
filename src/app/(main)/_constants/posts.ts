import type { PostStatus, StatusStyleEntry } from "../_types/post";

export const STATUS_STYLE: Record<PostStatus, StatusStyleEntry> = {
    normal: { label: "NORMAL", color: "#8a8a8a", bg: "rgba(138,138,138,0.05)" },
    hot: { label: "HOT", color: "#ff8c00", bg: "rgba(255,95,86,0.1)" },
    pinned: { label: "PINNED", color: "#ffd700", bg: "rgba(179,66,255,0.1)" },
    flagged: {
        label: "FLAGGED",
        color: "#ff3333",
        bg: "rgba(255,189,46,0.1)",
    },
    encrypted: {
        label: "ENCRYPTED",
        color: "#7b68ee",
        bg: "rgba(0,204,255,0.08)",
    },
};
