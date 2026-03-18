"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setAccessToken } from "@/lib/api";

interface LoginResponse {
  token: string;
  user: { id: number; alias: string; points: number; quota: { used: number; max: number } };
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setAccessToken(res.token);
      router.push("/feed");
    } catch {
      setError("LOGIN FAILED: INVALID CREDENTIALS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md border border-[var(--border-bright)] bg-[var(--bg-panel)]">
        {/* 터미널 타이틀바 */}
        <div className="flex items-center px-3 py-2 border-b border-[var(--border)] bg-[var(--bg-dark)]">
          <div className="flex gap-1.5 mr-3" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-[var(--mac-red)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--mac-yellow)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--mac-green)]" />
          </div>
          <span className="flex-1 text-center text-[0.625rem] text-[var(--text-dim)] tracking-[2px]">
            AUTH TERMINAL
          </span>
        </div>

        {/* 본문 */}
        <div className="p-5 md:p-8">
          {/* 시스템 메시지 */}
          <div className="mb-6 text-[0.75rem] leading-[1.8] text-[var(--text-dim)]">
            <p><span className="text-[var(--green)]">$</span> SYSTEM AUTH REQUIRED</p>
            <p><span className="text-[var(--green)]">$</span> ENTER CREDENTIALS TO PROCEED<span className="cursor" /></p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex items-center gap-2">
              <label htmlFor="username" className="text-[0.6875rem] text-[var(--text-dim)] shrink-0 w-8 md:w-28 text-left">
                <span className="hidden md:inline">user@hidenet:~$</span>
                <span className="md:hidden">$</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                autoComplete="username"
                className="flex-1 bg-transparent border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.75rem] md:text-[0.8125rem] outline-none py-1 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-2">
              <label htmlFor="password" className="text-[0.6875rem] text-[var(--text-dim)] shrink-0 w-8 md:w-28 text-left">
                <span className="hidden md:inline">passwd:~$</span>
                <span className="md:hidden">$</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="flex-1 bg-transparent border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.75rem] md:text-[0.8125rem] outline-none py-1 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
              />
            </div>

            {error && (
              <p className="text-[var(--red)] text-[0.6875rem]">{error}</p>
            )}

            {/* Submit */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--green)] border-none text-[var(--bg)] px-4 py-1.5 cursor-pointer font-[inherit] text-[0.75rem] tracking-[1px] font-bold disabled:opacity-50"
              >
                {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
              </button>
            </div>
          </form>

          {/* Register 링크 */}
          <div className="mt-6 pt-4 border-t border-[var(--border)] text-[0.6875rem] text-[var(--text-dim)]">
            <span>$ No access? </span>
            <Link href="/register" className="text-[var(--cyan)] no-underline hover:[text-shadow:0_0_8px_var(--cyan)]">
              [REQUEST ACCESS]
            </Link>
          </div>
        </div>
      </div>
  );
}
