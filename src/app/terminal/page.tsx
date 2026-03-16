import { TERMINAL_POSTS } from "@/constants";
import BoardFeed from "@/components/board/BoardFeed";

export default function TerminalPage() {
  return <BoardFeed posts={TERMINAL_POSTS} title="TERMINAL" showNewThread={true} />;
}
