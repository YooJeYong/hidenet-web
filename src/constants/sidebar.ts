import type { SystemStat } from "@/types";

export const SYSTEM_STATS: SystemStat[] = [
  { key: "CPU", value: "23%", bar: 23 },
  { key: "MEM", value: "67%", bar: 67 },
  { key: "NET_IN", value: "4.2 MB/s", bar: 42 },
  { key: "NET_OUT", value: "1.8 MB/s", bar: 18 },
];
