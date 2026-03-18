import { create } from "zustand";
import { apiFetch } from "@/lib/api";
import { clearAccessToken } from "@/lib/api";

interface User {
    id: number;
    alias: string;
    points: number;
    quota: { used: number; max: number };
}

interface AuthState {
    user: User | null;
    loading: boolean;
    setUser: (user: User) => void;
    init: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user, loading: false }),
    init: async () => {
        try {
            const { user } = await apiFetch<{ user: User }>("/api/auth/me");
            set({ user, loading: false });
        } catch {
            set({ user: null, loading: false });
        }
    },
    logout: async () => {
        try {
            await apiFetch("/api/auth/logout", { method: "POST" });
        } catch {
            // ignore
        }
        clearAccessToken();
        set({ user: null });
    },
}));
