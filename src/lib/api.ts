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
    const res = await fetch("/api/auth/refresh", {
        method: "POST",
    });
    if (!res.ok) return false;
    const { token } = await res.json();
    setAccessToken(token);
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

    let res = await fetch(path, {
        ...init,
        headers,
    });

    if (res.status === 401 && !path.includes("/auth/")) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            headers["Authorization"] = `Bearer ${getAccessToken()}`;
            res = await fetch(path, {
                ...init,
                headers,
            });
        }
    }

    if (!res.ok) {
        let serverMessage = "";
        try {
            const body = await res.json();
            serverMessage = body.error || "";
        } catch {}
        const err = new Error(`API ${res.status}`);
        (err as any).status = res.status;
        (err as any).serverMessage = serverMessage;
        throw err;
    }
    return res.json();
}
