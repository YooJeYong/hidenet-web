import BoardFeed from "../_components/BoardFeed";

export default function TerminalPage() {
  return <BoardFeed board="terminal" title="TERMINAL" showNewThread={true} allowReply={true} />;
}
