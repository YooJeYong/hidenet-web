const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

function getAccessToken(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
    return match ? match[1] : null;
}

export function setAccessToken(token: string): void {
    document.cookie = `accessToken=${token}; path=/; max-age=${30 * 60}; SameSite=Strict`;
}

export function clearAccessToken(): void {
    document.cookie = "accessToken=; path=/; max-age=0";
}

async function refreshAccessToken(): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) return false;
    const { data } = await res.json();
    setAccessToken(data.token);
    return true;
}

export async function apiFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<T> {
    const token = getAccessToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(init?.headers as Record<string, string>),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    let res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
        credentials: "include",
    });

    if (res.status === 401 && !path.includes("/auth/")) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            headers["Authorization"] = `Bearer ${getAccessToken()}`;
            res = await fetch(`${API_BASE}${path}`, {
                ...init,
                headers,
                credentials: "include",
            });
        }
    }

    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json();
}
