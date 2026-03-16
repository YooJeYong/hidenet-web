"use client";
import { useState } from "react";
import { POSTS } from "@/mocks/posts";
import { STATUS_STYLE } from "@/constants/posts";

export default function PostFeed() {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [newPost, setNewPost] = useState("");
    const [showInput, setShowInput] = useState(false);

    return (
        <div className="flex-1">
            <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-panel)]">
                <div className="flex items-center gap-3">
                    <span className="text-[var(--text-dim)] text-[0.75rem]">$</span>
                    <span className="text-[0.8125rem] tracking-[2px] text-[var(--green)]">PROCESS LIST</span>
                    <span className="text-[0.6875rem] text-[var(--text-dim)]">({POSTS.length} threads)</span>
                </div>
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="border border-[var(--border-bright)] text-[var(--green)] px-3.5 py-1 cursor-pointer text-[0.6875rem] font-[inherit] tracking-[1px] transition-all duration-200"
                    style={{ background: showInput ? "var(--green-dark)" : "transparent" }}
                >
                    {showInput ? "[-] CANCEL" : "[+] NEW THREAD"}
                </button>
            </div>

            {showInput && (
                <div className="px-5 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)] [animation:fadeIn_0.2s_ease-out]">
                    <div className="flex items-start gap-3">
                        <span className="text-[var(--green)] text-[0.8125rem] pt-2 shrink-0">n0de@hidenet:~$</span>
                        <textarea
                            value={newPost}
                            onChange={e => setNewPost(e.target.value)}
                            placeholder="echo '...' >> /dev/community"
                            className="flex-1 bg-transparent border-none border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.8125rem] resize-none outline-none min-h-[5rem] py-2 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
                        />
                    </div>
                    <div className="flex justify-end mt-3">
                        <button className="bg-[var(--green)] border-none text-[var(--bg)] px-4 py-1.5 cursor-pointer font-[inherit] text-[0.75rem] tracking-[1px] font-bold">
                            EXECUTE
                        </button>
                    </div>
                </div>
            )}

            <div
                className="grid px-5 py-1.5 text-[0.625rem] text-[var(--text-dim)] tracking-[2px] border-b border-[var(--border)] bg-[rgba(0,255,65,0.02)]"
                style={{ gridTemplateColumns: "60px 1fr 80px 70px 70px 100px" }}
            >
                <span>PID</span>
                <span>THREAD</span>
                <span className="text-center">REPLIES</span>
                <span className="text-center">VIEWS</span>
                <span className="text-center">STATUS</span>
                <span className="text-right">TIMESTAMP</span>
            </div>

            {POSTS.map((post, idx) => {
                const s = STATUS_STYLE[post.status];
                const isExpanded = expanded === post.id;
                return (
                    <div
                        key={post.id}
                        className="border-b border-[var(--border)] transition-colors duration-150"
                        style={{
                            animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`,
                            background: isExpanded ? "var(--bg-secondary)" : "transparent",
                        }}
                    >
                        <div
                            onClick={() => setExpanded(isExpanded ? null : post.id)}
                            className="grid px-5 py-3.5 cursor-pointer items-start gap-2 hover:bg-[rgba(0,255,65,0.03)]"
                            style={{ gridTemplateColumns: "60px 1fr 80px 70px 70px 100px" }}
                        >
                            <span className="text-[0.6875rem] text-[var(--text-dim)] font-[inherit] pt-0.5">
                                {post.pid}
                            </span>

                            <div>
                                <div className="flex items-center gap-2.5 mb-1">
                                    <span className="text-[0.6875rem] text-[var(--cyan-dim)]">[{post.user}]</span>
                                    <span className="text-[0.625rem] text-[var(--text-dim)]">{post.uid}</span>
                                </div>
                                <p
                                    className="text-[0.8125rem] text-[var(--text-primary)] leading-[1.5]"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: isExpanded ? "unset" as unknown as number : 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: isExpanded ? "visible" : "hidden",
                                    }}
                                >
                                    {isExpanded && <span className="text-[var(--green)] mr-2">▶</span>}
                                    {post.content}
                                </p>
                                {isExpanded && (
                                    <div className="mt-2.5 flex gap-1.5 flex-wrap">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[0.625rem] px-2 py-0.5 border border-[var(--border)] text-[var(--text-dim)] tracking-[1px]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <span className="text-[0.75rem] text-[var(--green-dim)] text-center pt-0.5">{post.replies}</span>
                            <span className="text-[0.75rem] text-[var(--text-dim)] text-center pt-0.5">{post.views.toLocaleString()}</span>
                            <div className="text-center pt-0.5">
                                <span
                                    className="text-[0.625rem] px-1.5 py-0.5 tracking-[1px]"
                                    style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}40` }}
                                >
                                    {s.label}
                                </span>
                            </div>
                            <span className="text-[0.625rem] text-[var(--text-dim)] text-right pt-0.5 leading-[1.4] whitespace-pre-line">
                                {post.timestamp.split(" ").join("\n")}
                            </span>
                        </div>

                        {isExpanded && (
                            <div className="pr-5 pb-4 pl-20 [animation:fadeIn_0.2s_ease-out]">
                                <div className="flex gap-2.5 items-center">
                                    <span className="text-[0.75rem] text-[var(--text-dim)]">reply&gt;</span>
                                    <input
                                        type="text"
                                        placeholder="type your response..."
                                        className="bg-transparent border-none border-b border-[var(--border)] text-[var(--green)] font-[inherit] text-[0.75rem] outline-none py-1 w-[18.75rem] caret-[var(--green)] placeholder:text-[var(--text-dim)]"
                                    />
                                    <button className="bg-transparent border border-[var(--border-bright)] text-[var(--green-dim)] px-2.5 py-0.5 cursor-pointer text-[0.6875rem] font-[inherit]">
                                        SEND
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
