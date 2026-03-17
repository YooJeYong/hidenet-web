import { TERMINAL_POSTS } from "@/mocks/posts";
import BoardFeed from "../_components/BoardFeed";

export default function TerminalPage() {
  return <BoardFeed posts={TERMINAL_POSTS} title="TERMINAL" showNewThread={true} allowReply={true} />;
}
