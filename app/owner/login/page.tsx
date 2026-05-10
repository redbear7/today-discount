"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase";

export default function OwnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/owner/dashboard");
    });
  }, [router]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!email.includes("@")) {
      setMessage("이메일을 정확히 입력해주세요.");
      return;
    }

    if (password.length < 6) {
      setMessage("비밀번호는 6자 이상 입력해주세요.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 먼저 설정해주세요.");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage("로그인에 실패했습니다. 계정을 확인해주세요.");
      setIsLoading(false);
      return;
    }

    router.push("/owner/dashboard");
  }

  return (
    <main className="mx-auto flex h-[100dvh] max-w-[430px] flex-col bg-white px-4 text-[#111111]">
      <header className="pt-8">
        <p className="text-[14px] font-[700] text-brand">오늘할인 사장님</p>
        <h1 className="mt-1 text-[26px] font-[780] leading-tight">쿠폰 관리 로그인</h1>
        <p className="mt-2 text-[15px] font-[430] leading-6 text-neutral-500">
          오늘 등록하고 바로 동네 손님에게 노출하세요.
        </p>
      </header>

      <form onSubmit={login} className="mt-8 space-y-3">
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-[13px] font-[700]">
            <Mail className="h-4 w-4" />
            이메일
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@example.com"
            className="h-12 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-[13px] font-[700]">
            <LockKeyhole className="h-4 w-4" />
            비밀번호
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="6자 이상"
            className="h-12 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
          />
        </label>

        {message ? (
          <div className="rounded-2xl bg-orange-50 p-3 text-[13px] font-[700] leading-5 text-brand">
            {message}
          </div>
        ) : null}

        <Button className="h-14 w-full text-[16px]" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </main>
  );
}
