import BoardFeed from "../_components/BoardFeed";

export default function RecycleBinPage() {
  return <BoardFeed board="recycle-bin" title="RECYCLE_BIN" showNewThread={true} allowReply={true} />;
}
