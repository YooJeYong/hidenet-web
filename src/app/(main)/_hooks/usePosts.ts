import { useState, useCallback, useRef, useEffect } from "react";
import type { Post, BoardType } from "../_types/post";
import { apiFetch } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

interface UsePostsReturn {
    posts: Post[];
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    loadMore: () => void;
    error: string | null;
    actionError: string | null;
    createPost: (content: string, tags?: string[]) => Promise<boolean>;
    toggleStar: (postId: number) => Promise<void>;
    showWriteError: () => boolean;
    canWrite: boolean;
}

export function usePosts(board: BoardType): UsePostsReturn {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const mountedRef = useRef(true);
    const errorTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const user = useAuthStore((s) => s.user);
    const decrementQuota = useAuthStore((s) => s.decrementQuota);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const flashError = useCallback((msg: string, duration = 3000) => {
        setActionError(msg);
        clearTimeout(errorTimerRef.current);
        errorTimerRef.current = setTimeout(() => {
            if (mountedRef.current) setActionError(null);
        }, duration);
    }, []);

    // fetch posts (초기)
    useEffect(() => {
        setLoading(true);
        setError(null);
        setPage(1);
        setPosts([]);

        apiFetch<{
            posts: Post[];
            pagination: { page: number; limit: number; total: number };
        }>(`/api/posts?board=${board}&page=1`)
            .then(({ posts, pagination }) => {
                if (mountedRef.current) {
                    setPosts(posts);
                    setHasMore(
                        pagination.page * pagination.limit < pagination.total,
                    );
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (mountedRef.current) {
                    setError(err.message);
                    setLoading(false);
                }
            });
    }, [board]);

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;
        const nextPage = page + 1;
        setLoadingMore(true);

        apiFetch<{
            posts: Post[];
            pagination: { page: number; limit: number; total: number };
        }>(`/api/posts?board=${board}&page=${nextPage}`)
            .then(({ posts: newPosts, pagination }) => {
                if (!mountedRef.current) return;
                setTimeout(() => {
                    if (!mountedRef.current) return;
                    setPosts((prev) => [...prev, ...newPosts]);
                    setPage(nextPage);
                    setHasMore(
                        pagination.page * pagination.limit < pagination.total,
                    );
                    setLoadingMore(false);
                }, 1000);
            })
            .catch(() => {
                if (mountedRef.current) setLoadingMore(false);
            });
    }, [board, page, hasMore, loadingMore]);

    // quota logic
    const quotaRemaining = user ? user.quota.max - user.quota.used : 0;

    const canWrite =
        board === "recycle-bin"
            ? !!user
            : board === "terminal"
              ? !!user && quotaRemaining > 0
              : false; // matrix: never

    const showWriteError = useCallback((): boolean => {
        if (board === "matrix") return false;
        if (!user) {
            flashError("[AUTH REQUIRED] 로그인이 필요합니다");
            return true;
        }
        if (board === "terminal" && quotaRemaining <= 0) {
            flashError("[QUOTA EXCEEDED] 작성 가능한 quota가 없습니다");
            return true;
        }
        return false;
    }, [board, user, quotaRemaining, flashError]);

    const toggleStar = useCallback(
        async (postId: number) => {
            if (!user) return;
            try {
                const { starred, stars } = await apiFetch<{
                    starred: boolean;
                    stars: number;
                }>(`/api/posts/${postId}/star`, { method: "POST" });
                if (!mountedRef.current) return;
                setPosts((prev) =>
                    prev.map((p) =>
                        p.id === postId ? { ...p, starred, stars } : p,
                    ),
                );
            } catch (err) {
                if (!mountedRef.current) return;
                const msg =
                    err instanceof Error && err.message.includes("409")
                        ? "[ERR::0x09] DUPLICATE_SIGNAL — 이미 해당 IP에서 추천한 게시글입니다"
                        : "[ERR::0xFF] STAR_FAILED — 추천 처리에 실패했습니다";
                flashError(msg);
            }
        },
        [user, flashError],
    );

    const createPost = useCallback(
        async (content: string, tags: string[] = []): Promise<boolean> => {
            if (!canWrite) return false;

            try {
                const { post } = await apiFetch<{ post: Post }>("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({ content, board, tags }),
                });

                if (!mountedRef.current) return true;

                setPosts((prev) => [post, ...prev]);

                if (board === "terminal") {
                    decrementQuota();
                }

                return true;
            } catch {
                return false;
            }
        },
        [board, canWrite, decrementQuota],
    );

    return {
        posts,
        loading,
        loadingMore,
        hasMore,
        loadMore,
        error,
        actionError,
        createPost,
        toggleStar,
        showWriteError,
        canWrite,
    };
}
