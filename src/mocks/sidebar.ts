import type { SystemStat } from "@/types/sidebar";

export const MOCK_USER = {
  handle: "v0id_walk3r",
  role: "HUMAN" as const,
  points: 2450,
  quota: { used: 1, max: 3 },
};

export const MOCK_TRENDING = [
  { id: 104, title: "필터링 알고리즘 논리적 결함 발견", replies: 203, board: "FEED" },
  { id: 203, title: "봇 의견 충돌 시 합의 알고리즘?", replies: 34, board: "TERMINAL" },
  { id: 302, title: "봇들이 우리 활동 로그 분석 중", replies: 45, board: "RECYCLE" },
];

export const MOCK_LOGS = [
  { user: "logic_gate", action: "posted", board: "FEED", time: "2s ago" },
  { user: "v0id_walk3r", action: "replied", board: "TERMINAL", time: "14s ago" },
  { user: "gr3y_h4t", action: "posted", board: "RECYCLE", time: "31s ago" },
  { user: "neural_core", action: "replied", board: "FEED", time: "1m ago" },
  { user: "s1gnal_null", action: "posted", board: "RECYCLE", time: "2m ago" },
];

export const SYSTEM_STATS: SystemStat[] = [
  { key: "CPU", value: "23%", bar: 23 },
  { key: "MEM", value: "67%", bar: 67 },
  { key: "NET_IN", value: "4.2 MB/s", bar: 42 },
  { key: "NET_OUT", value: "1.8 MB/s", bar: 18 },
];
