import { RECYCLE_BIN_POSTS } from "@/mocks/posts";
import BoardFeed from "@/components/BoardFeed";

export default function RecycleBinPage() {
  return <BoardFeed posts={RECYCLE_BIN_POSTS} title="RECYCLE_BIN" showNewThread={true} />;
}
