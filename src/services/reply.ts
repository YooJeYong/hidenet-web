import type { Reply } from "@/types/post";

export interface CreateReplyPayload {
    postId: number;
    content: string;
}

export interface CreateReplyResponse {
    reply: Reply;
}

/**
 * 리플 작성 API
 * TODO: 백엔드 연결 시 실제 fetch로 교체
 */
export async function createReply(
    payload: CreateReplyPayload,
): Promise<CreateReplyResponse> {
    // --- mock: 백엔드 연결 전 임시 로직 ---
    await new Promise((r) => setTimeout(r, 300));

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    return {
        reply: {
            alias: "anon",
            content: payload.content,
            timestamp,
        },
    };
    // --- /mock ---
}
