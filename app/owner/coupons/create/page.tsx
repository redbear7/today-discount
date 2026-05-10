"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CouponForm } from "@/components/owner/CouponForm";
import { getSupabaseClient } from "@/lib/supabase";

type OwnerSession = {
  id: string;
  email?: string;
};

export default function OwnerCouponCreatePage() {
  const [owner, setOwner] = useState<OwnerSession | null>(null);
  const [message, setMessage] = useState("불러오는 중...");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 먼저 설정해주세요.");
      return;
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        window.location.href = "/owner/login";
        return;
      }

      setOwner({ id: data.user.id, email: data.user.email ?? undefined });
    });
  }, []);

  if (!owner) {
    return (
      <main className="mx-auto h-[100dvh] max-w-[430px] bg-white p-4 text-[#111111]">
        <p className="rounded-2xl bg-orange-50 p-4 text-[14px] font-[700] text-brand">
          {message}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center gap-3">
          <Link href="/owner/dashboard" className="grid h-10 w-10 place-items-center rounded-full" aria-label="대시보드로">
            <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
          </Link>
          <div>
            <h1 className="text-[20px] font-[780] leading-tight">쿠폰 등록</h1>
            <p className="text-[12px] font-[430] text-neutral-500">빠르게 등록하고 바로 노출</p>
          </div>
        </div>
      </header>

      <CouponForm ownerId={owner.id} ownerEmail={owner.email} />
    </main>
  );
}
