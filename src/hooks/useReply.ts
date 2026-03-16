import { useState, useCallback, useRef, useEffect } from "react";
import type { Post } from "@/types/post";
import { createReply } from "@/services/reply";

interface UseReplyReturn {
    posts: Post[];
    replyText: string;
    setReplyText: (text: string) => void;
    isSubmitting: boolean;
    submitReply: (postId: number) => Promise<void>;
}

export function useReply(initialPosts: Post[]): UseReplyReturn {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [replyText, setReplyText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const submitReply = useCallback(async (postId: number) => {
        const trimmed = replyText.trim();
        if (!trimmed || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const { reply } = await createReply({
                postId,
                content: trimmed,
            });

            if (!mountedRef.current) return;

            setPosts((prev) =>
                prev.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              replies: post.replies + 1,
                              replyList: [...(post.replyList ?? []), reply],
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
    }, [replyText, isSubmitting]);

    return { posts, replyText, setReplyText, isSubmitting, submitReply };
}
