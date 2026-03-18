"use client";
import { useState, useMemo } from "react";
import { STATUS_STYLE } from "../_constants/posts";
import { useReply } from "../_hooks/useReply";
import ReplyInput from "./ReplyInput";
import type { Post, PostStatus } from "../_types/post";

type StatusFilter = PostStatus | "all";

interface BoardFeedProps {
    posts: Post[];
    title: string;
    showNewThread?: boolean;
    allowReply?: boolean;
}

export default function BoardFeed({
    posts: initialPosts,
    title,
    showNewThread = true,
    allowReply = false,
}: BoardFeedProps) {
    const { posts, replyText, setReplyText, isSubmitting, submitReply } =
        useReply(initialPosts);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [newPost, setNewPost] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [filter, setFilter] = useState<StatusFilter>("all");

    const statusCounts = useMemo(
        () =>
            posts.reduce<Record<string, number>>((acc, p) => {
                acc[p.status] = (acc[p.status] || 0) + 1;
                return acc;
            }, {}),
        [posts],
    );

    const filteredPosts =
        filter === "all" ? posts : posts.filter((p) => p.status === filter);

    return (
        <div className="flex flex-col h-full">
            {/* 타이틀바 */}
            <header className="h-[60px] px-3 md:px-5 py-2.5 md:py-3 border-b border-[var(--border)] flex items-center bg-[var(--bg-panel)] shrink-0">
                <div className="flex items-center gap-2 md:gap-3 shrink-0 w-[240px]">
                    <span className="text-[var(--text-dim)] text-[0.6875rem] md:text-[0.75rem]">
                        $
                    </span>
                    <span className="text-[0.75rem] md:text-[0.8125rem] tracking-[2px] text-[var(--green)]">
                        {title}
                    </span>
                    <span className="text-[0.5625rem] md:text-[0.6875rem] text-[var(--text-dim)]">
                        ({filteredPosts.length})
                    </span>
                </div>

                {/* STATUS 필터 라벨 */}
                <div className="flex-1 flex">
                    <div className="flex items-center gap-1 md:gap-1.5">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-1.5 md:px-2 py-0.5 text-[0.5rem] md:text-[0.625rem] tracking-[1px] font-[inherit] cursor-pointer border transition-all duration-150 ${
                                filter === "all"
                                    ? "text-[var(--green)] border-[var(--green)] bg-[rgba(0,255,65,0.1)] [text-shadow:0_0_6px_var(--green)]"
                                    : "text-[var(--text-dim)] border-[var(--border)] bg-transparent hover:text-[var(--green)] hover:border-[var(--green)]"
                            }`}
                        >
                            ALL
                        </button>
                        {(Object.keys(STATUS_STYLE) as PostStatus[]).map(
                            (status) => {
                                const s = STATUS_STYLE[status];
                                const count = statusCounts[status] || 0;
                                if (count === 0) return null;
                                return (
                                    <button
                                        key={status}
                                        onClick={() =>
                                            setFilter(
                                                filter === status
                                                    ? "all"
                                                    : status,
                                            )
                                        }
                                        className={`px-1.5 md:px-2 py-0.5 text-[0.5rem] md:text-[0.625rem] tracking-[1px] font-[inherit] cursor-pointer border transition-all duration-150 ${
                                            filter === status
                                                ? `border-[${s.color}] [text-shadow:0_0_6px_${s.color}]`
                                                : "border-[var(--border)] hover:opacity-100"
                                        }`}
                                        style={{
                                            color:
                                                filter === status
                                                    ? s.color
                                                    : "var(--text-dim)",
                                            borderColor:
                                                filter === status
                                                    ? s.color
                                                    : undefined,
                                            background:
                                                filter === status
                                                    ? s.bg
                                                    : "transparent",
                                        }}
                                    >
                                        {s.label}{" "}
                                        <span className="opacity-60">
                                            {count}
                                        </span>
                                    </button>
                                );
                            },
                        )}
                    </div>
                </div>

                {showNewThread && (
                    <button
                        onClick={() => setShowInput(!showInput)}
                        className="border border-[var(--border-bright)] text-[var(--green)] px-2 md:px-3.5 py-1 cursor-pointer text-[0.5625rem] md:text-[0.6875rem] font-[inherit] tracking-[1px] transition-all duration-200"
                        style={{
                            background: showInput
                                ? "var(--green-dark)"
                                : "transparent",
                        }}
                        aria-label={
                            showInput
                                ? "Cancel new thread"
                                : "Create new thread"
                        }
                        aria-expanded={showInput}
                    >
                        {showInput ? "[-]" : "[+]"}
                        <span className="hidden md:inline">
                            {" "}
                            {showInput ? "CANCEL" : "NEW THREAD"}
                        </span>
                    </button>
                )}
            </header>

            {/* 글쓰기 영역 */}
            {showInput && (
                <div className="px-3 md:px-5 py-3 md:py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] [animation:fadeIn_0.2s_ease-out] shrink-0">
                    <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-[var(--green)] text-[0.6875rem] md:text-[0.8125rem] pt-2 shrink-0">
                            <span className="hidden md:inline">
                                anon@hidenet:~$
                            </span>
                            <span className="md:hidden">$</span>
                        </span>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="echo '...' >> /dev/community"
                            aria-label="New thread content"
                            className="flex-1 bg-transparent border-none border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.75rem] md:text-[0.8125rem] resize-none outline-none min-h-[4rem] md:min-h-[5rem] py-2 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
                        />
                    </div>
                    <div className="flex justify-end mt-2 md:mt-3">
                        <button
                            aria-label="Submit new thread"
                            className="bg-[var(--green)] border-none text-[var(--bg)] px-3 md:px-4 py-1 md:py-1.5 cursor-pointer font-[inherit] text-[0.6875rem] md:text-[0.75rem] tracking-[1px] font-bold"
                        >
                            EXECUTE
                        </button>
                    </div>
                </div>
            )}

            {/* 테이블 헤더 — 모바일: THREAD + STATUS만 */}
            <div
                className="hidden md:grid px-5 py-1.5 gap-2 text-[0.625rem] text-[var(--text-dim)] tracking-[2px] border-b border-[var(--border)] bg-[rgba(0,255,65,0.02)] shrink-0"
                style={{ gridTemplateColumns: "60px 1fr 80px 70px 70px 100px" }}
                role="row"
                aria-label="Table header"
            >
                <span>PID</span>
                <span>THREAD</span>
                <span className="text-center">REPLIES</span>
                <span className="text-center">VIEWS</span>
                <span className="text-center">STATUS</span>
                <span className="text-right">TIMESTAMP</span>
            </div>
            <div
                className="md:hidden flex px-3 py-1.5 text-[0.5625rem] text-[var(--text-dim)] tracking-[2px] border-b border-[var(--border)] bg-[rgba(0,255,65,0.02)] shrink-0 justify-between"
                role="row"
                aria-label="Table header"
            >
                <span>THREAD</span>
                <span>STATUS</span>
            </div>

            {/* 게시글 목록 */}
            <ul
                className="flex-1 overflow-y-auto list-none m-0 p-0"
                aria-label={`${title} thread list`}
            >
                {filteredPosts.map((post, idx) => {
                    const s = STATUS_STYLE[post.status];
                    const isExpanded = expanded === post.id;
                    return (
                        <li
                            key={post.id}
                            className="border-b border-[var(--border)] transition-colors duration-150"
                            style={{
                                animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`,
                                background: isExpanded
                                    ? "var(--bg-secondary)"
                                    : "transparent",
                            }}
                        >
                            <article
                                onClick={() =>
                                    setExpanded(isExpanded ? null : post.id)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setExpanded(
                                            isExpanded ? null : post.id,
                                        );
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isExpanded}
                                aria-label={`Thread by ${post.alias}: ${post.content.slice(0, 60)}`}
                                className="cursor-pointer hover:bg-[rgba(0,255,65,0.03)]"
                            >
                                {/* 데스크탑 레이아웃 */}
                                <div
                                    className="hidden md:grid px-5 py-3.5 items-start gap-2"
                                    style={{
                                        gridTemplateColumns:
                                            "60px 1fr 80px 70px 70px 100px",
                                    }}
                                >
                                    <span className="text-[0.6875rem] text-[var(--text-dim)] font-[inherit] pt-0.5">
                                        {post.pid}
                                    </span>

                                    <div>
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <span className="text-[0.6875rem] text-[var(--cyan-dim)]">
                                                [{post.alias}]
                                            </span>
                                        </div>
                                        <p
                                            className="text-[0.8125rem] text-[var(--text-primary)] leading-[1.5]"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: isExpanded
                                                    ? ("unset" as unknown as number)
                                                    : 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: isExpanded
                                                    ? "visible"
                                                    : "hidden",
                                            }}
                                        >
                                            {isExpanded && (
                                                <span className="text-[var(--green)] mr-2">
                                                    ▶
                                                </span>
                                            )}
                                            {post.content}
                                        </p>
                                        {isExpanded && (
                                            <div className="mt-2.5 flex gap-1.5 flex-wrap">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[0.625rem] px-2 py-0.5 border border-[var(--border)] text-[var(--text-dim)] tracking-[1px]"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <span className="text-[0.75rem] text-[var(--green-dim)] text-center pt-0.5">
                                        {post.replies}
                                    </span>
                                    <span className="text-[0.75rem] text-[var(--text-dim)] text-center pt-0.5">
                                        {post.views.toLocaleString()}
                                    </span>
                                    <div className="text-center pt-0.5">
                                        <span
                                            className="text-[0.625rem] px-1.5 py-0.5 tracking-[1px]"
                                            style={{
                                                color: s.color,
                                                background: s.bg,
                                                border: `1px solid ${s.color}40`,
                                            }}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    <span className="text-[0.625rem] text-[var(--text-dim)] text-right pt-0.5 leading-[1.4] whitespace-pre-line">
                                        {post.timestamp.split(" ").join("\n")}
                                    </span>
                                </div>

                                {/* 모바일 레이아웃 */}
                                <div className="md:hidden px-3 py-3">
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <span className="text-[0.625rem] text-[var(--cyan-dim)] shrink-0">
                                                [{post.alias}]
                                            </span>
                                            <span className="text-[0.5rem] text-[var(--text-dim)]">
                                                {post.pid}
                                            </span>
                                        </div>
                                        <span
                                            className="text-[0.5rem] px-1 py-px tracking-[1px] shrink-0"
                                            style={{
                                                color: s.color,
                                                background: s.bg,
                                                border: `1px solid ${s.color}40`,
                                            }}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    <p
                                        className="text-[0.75rem] text-[var(--text-primary)] leading-[1.5]"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: isExpanded
                                                ? ("unset" as unknown as number)
                                                : 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: isExpanded
                                                ? "visible"
                                                : "hidden",
                                        }}
                                    >
                                        {isExpanded && (
                                            <span className="text-[var(--green)] mr-1">
                                                ▶
                                            </span>
                                        )}
                                        {post.content}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1.5 text-[0.5rem] text-[var(--text-dim)]">
                                        <span>↩ {post.replies}</span>
                                        <span>
                                            👁 {post.views.toLocaleString()}
                                        </span>
                                        <span className="ml-auto">
                                            {post.timestamp.split(" ")[0]}
                                        </span>
                                    </div>
                                    {isExpanded && (
                                        <div className="mt-2 flex gap-1 flex-wrap">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[0.5rem] px-1.5 py-px border border-[var(--border)] text-[var(--text-dim)] tracking-[1px]"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>

                            {/* 리플 영역 — 공통 */}
                            {isExpanded && (
                                <div
                                    className="pr-3 md:pr-5 pb-3 md:pb-4 pl-3 md:pl-20 [animation:fadeIn_0.2s_ease-out]"
                                    role="region"
                                    aria-label="Replies"
                                >
                                    {/* 기존 리플 목록 */}
                                    {post.replyList &&
                                        post.replyList.length > 0 && (
                                            <div className="mb-3">
                                                {/* 리플 헤더 */}
                                                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[var(--border)]">
                                                    <span className="text-[0.5625rem] md:text-[0.625rem] text-[var(--green-dim)] tracking-[2px]">
                                                        REPLIES
                                                    </span>
                                                    <span className="text-[0.5rem] md:text-[0.5625rem] text-[var(--text-dim)]">
                                                        ({post.replyList.length}
                                                        )
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-1.5">
                                                    {post.replyList.map(
                                                        (reply, ri) => (
                                                            <div
                                                                key={ri}
                                                                className="border-l-2 border-[var(--green-dark)] pl-2.5 md:pl-3 py-2 md:py-2.5 bg-[rgba(0,255,65,0.02)] hover:bg-[rgba(0,255,65,0.05)] transition-colors duration-150"
                                                                style={{
                                                                    animation: `fadeIn 0.2s ease-out ${ri * 0.08}s both`,
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5">
                                                                    <span className="text-[0.5rem] md:text-[0.5625rem] text-[var(--text-dim)] shrink-0">
                                                                        #
                                                                        {String(
                                                                            ri +
                                                                                1,
                                                                        ).padStart(
                                                                            2,
                                                                            "0",
                                                                        )}
                                                                    </span>
                                                                    <span className="text-[0.5625rem] md:text-[0.625rem] text-[var(--cyan-dim)] font-bold">
                                                                        &gt;{" "}
                                                                        {
                                                                            reply.alias
                                                                        }
                                                                    </span>
                                                                    <span className="text-[0.4375rem] md:text-[0.5rem] text-[var(--text-dim)] ml-auto shrink-0">
                                                                        {
                                                                            reply.timestamp.split(
                                                                                " ",
                                                                            )[1]
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <p className="text-[0.6875rem] md:text-[0.75rem] text-[var(--text-secondary)] leading-[1.6] pl-0.5">
                                                                    {
                                                                        reply.content
                                                                    }
                                                                </p>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* 리플 입력 */}
                                    {allowReply ? (
                                        <ReplyInput
                                            value={replyText}
                                            onChange={setReplyText}
                                            onSubmit={() =>
                                                submitReply(post.id)
                                            }
                                            isSubmitting={isSubmitting}
                                        />
                                    ) : (
                                        <div className="text-[0.625rem] text-[var(--red)] tracking-[1px] py-1 border-t border-[var(--border)] mt-2 pt-2">
                                            [READ ONLY] 당신은 게시판에서 리플을
                                            작성할 수 없습니다
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
