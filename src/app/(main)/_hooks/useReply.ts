import { useState, useCallback, useRef, useEffect } from "react";
import type { Post, Reply } from "../_types/post";
import { apiFetch } from "@/lib/api";

interface UseReplyReturn {
    replyText: string;
    setReplyText: (text: string) => void;
    isSubmitting: boolean;
    submitReply: (postId: number) => Promise<void>;
}

export function useReply(
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
): UseReplyReturn {
    const [replyText, setReplyText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mountedRef = useRef(true);
    const replyTextRef = useRef(replyText);
    const isSubmittingRef = useRef(isSubmitting);

    replyTextRef.current = replyText;
    isSubmittingRef.current = isSubmitting;

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    const submitReply = useCallback(async (postId: number) => {
        const trimmed = replyTextRef.current.trim();
        if (!trimmed || isSubmittingRef.current) return;

        setIsSubmitting(true);
        try {
            const { reply } = await apiFetch<{ reply: Reply }>("/api/replies", {
                method: "POST",
                body: JSON.stringify({ postId, content: trimmed }),
            });

            if (!mountedRef.current) return;

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              replies: post.replies + 1,
                              replyList: [...post.replyList, reply],
                          }
                        : post,
                ),
            );
            setReplyText("");
        } finally {
            if (mountedRef.current) {
                setIsSubmitting(false);
            }
        }
    }, [setPosts]);

    return { replyText, setReplyText, isSubmitting, submitReply };
}
