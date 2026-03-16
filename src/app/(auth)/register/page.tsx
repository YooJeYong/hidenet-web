"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("ERROR: PASSWORD MISMATCH");
      return;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-[var(--border-bright)] bg-[var(--bg-panel)]">
        {/* 터미널 타이틀바 */}
        <div className="flex items-center px-3 py-2 border-b border-[var(--border)] bg-[var(--bg-dark)]">
          <div className="flex gap-1.5 mr-3" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-[var(--mac-red)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--mac-yellow)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--mac-green)]" />
          </div>
          <span className="flex-1 text-center text-[0.625rem] text-[var(--text-dim)] tracking-[2px]">
            ACCESS REQUEST
          </span>
        </div>

        {/* 본문 */}
        <div className="p-5 md:p-8">
          {/* 시스템 메시지 */}
          <div className="mb-6 text-[0.75rem] leading-[1.8] text-[var(--text-dim)]">
            <p><span className="text-[var(--green)]">$</span> NEW NODE REGISTRATION</p>
            <p><span className="text-[var(--green)]">$</span> SET CREDENTIALS TO JOIN NETWORK<span className="cursor" /></p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex items-center gap-2">
              <label htmlFor="reg-username" className="text-[0.6875rem] text-[var(--text-dim)] shrink-0 w-8 md:w-28 text-right">
                <span className="hidden md:inline">user@hidenet:~$</span>
                <span className="md:hidden">$</span>
              </label>
              <input
                id="reg-username"
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
              <label htmlFor="reg-password" className="text-[0.6875rem] text-[var(--text-dim)] shrink-0 w-8 md:w-28 text-right">
                <span className="hidden md:inline">passwd:~$</span>
                <span className="md:hidden">$</span>
              </label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="flex-1 bg-transparent border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.75rem] md:text-[0.8125rem] outline-none py-1 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center gap-2">
              <label htmlFor="reg-confirm" className="text-[0.6875rem] text-[var(--text-dim)] shrink-0 w-8 md:w-28 text-right">
                <span className="hidden md:inline">confirm:~$</span>
                <span className="md:hidden">$</span>
              </label>
              <input
                id="reg-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="flex-1 bg-transparent border-b border-[var(--border-bright)] text-[var(--green)] font-[inherit] text-[0.75rem] md:text-[0.8125rem] outline-none py-1 caret-[var(--green)] placeholder:text-[var(--text-dim)]"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[0.6875rem] text-[var(--red)] [animation:fadeIn_0.2s_ease-out]">
                <span className="text-[var(--red)]">!</span> {error}
              </p>
            )}

            {/* Submit */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-[var(--green)] border-none text-[var(--bg)] px-4 py-1.5 cursor-pointer font-[inherit] text-[0.75rem] tracking-[1px] font-bold"
              >
                REQUEST ACCESS
              </button>
            </div>
          </form>

          {/* Login 링크 */}
          <div className="mt-6 pt-4 border-t border-[var(--border)] text-[0.6875rem] text-[var(--text-dim)]">
            <span>$ Already have access? </span>
            <Link href="/login" className="text-[var(--cyan)] no-underline hover:[text-shadow:0_0_8px_var(--cyan)]">
              [AUTHENTICATE]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
