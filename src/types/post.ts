export type PostStatus = "active" | "hot" | "new" | "pinned";

export type Reply = {
  user: string;
  uid: string;
  content: string;
  timestamp: string;
};

export type Post = {
  id: number;
  pid: string;
  user: string;
  uid: string;
  content: string;
  timestamp: string;
  replies: number;
  views: number;
  tags: string[];
  status: PostStatus;
  replyList?: Reply[];
};

export type StatusStyleEntry = {
  label: string;
  color: string;
  bg: string;
};
