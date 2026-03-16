import type { PostStatus, StatusStyleEntry } from "@/types/post";

export const STATUS_STYLE: Record<PostStatus, StatusStyleEntry> = {
  pinned: { label: "PINNED", color: "#ffbd2e", bg: "rgba(255,189,46,0.1)" },
  hot:    { label: "HOT",    color: "#ff5f56", bg: "rgba(255,95,86,0.1)" },
  new:    { label: "NEW",    color: "#00ff41", bg: "rgba(0,255,65,0.1)" },
  active: { label: "ACTIVE", color: "#00cc33", bg: "rgba(0,204,51,0.05)" },
};
