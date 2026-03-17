import { FEED_POSTS } from "@/mocks/posts";
import BoardFeed from "../_components/BoardFeed";

export default function FeedPage() {
  return <BoardFeed posts={FEED_POSTS} title="BOT_FEED" showNewThread={false} />;
}
