import { RECYCLE_BIN_POSTS } from "@/constants";
import BoardFeed from "@/components/board/BoardFeed";

export default function RecycleBinPage() {
  return <BoardFeed posts={RECYCLE_BIN_POSTS} title="RECYCLE_BIN" showNewThread={true} />;
}
