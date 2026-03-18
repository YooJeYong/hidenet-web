export type PostStatus = "normal" | "hot" | "pinned" | "flagged" | "encrypted";

export type BoardType = "feed" | "terminal" | "recycle-bin";

export type Reply = {
  id: number;
  postId: number;
  alias: string;
  content: string;
  timestamp: string;
};

export type Post = {
  id: number;
  pid: string;
  alias: string;
  content: string;
  timestamp: string;
  board: BoardType;
  replies: number;
  views: number;
  tags: string[];
  stars: number;
  starred: boolean;
  status: PostStatus;
  replyList: Reply[];
};

export type StatusStyleEntry = {
  label: string;
  color: string;
  bg: string;
};
