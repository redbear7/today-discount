"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { CouponRow, formatExpiresAt, getSupabaseClient } from "@/lib/supabase";

export function HomeContent() {
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function loadCoupons() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setMessage("Supabase 환경변수를 설정하면 실제 쿠폰이 표시됩니다.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("coupons")
        .select("id,title,store,discount,expires_at,image_url,created_at")
        .order("expires_at", { ascending: true })
        .limit(12);

      if (!alive) return;

      if (error) {
        setMessage("쿠폰을 불러오지 못했습니다. Supabase 설정을 확인해주세요.");
        setIsLoading(false);
        return;
      }

      setCoupons(data ?? []);
      setIsLoading(false);
    }

    loadCoupons();
    return () => {
      alive = false;
    };
  }, []);

  const endingSoonCoupons = coupons.slice(0, 4);
  const popularCoupons = coupons.slice(4, 9).length > 0 ? coupons.slice(4, 9) : coupons.slice(0, 5);

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-20 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center justify-between">
          <button className="flex h-10 items-center gap-1.5 text-[21px] font-[850] tracking-normal" type="button">
            창원 상남동
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </button>
          <button className="relative grid h-10 w-10 place-items-center rounded-full" type="button" aria-label="알림">
            <Bell className="h-5 w-5" strokeWidth={2.5} />
            <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-brand" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-2">
        <SearchBar />
      </div>

      <section className="pt-3">
        <div className="px-4">
          <SectionHeader title="오늘 마감 할인" subtitle="3초 안에 보고 바로 받기" />
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading ? (
            <CouponSkeleton compact />
          ) : (
            endingSoonCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                image={coupon.image_url}
                title={coupon.title}
                store={coupon.store}
                discount={coupon.discount}
                expiresAt={formatExpiresAt(coupon.expires_at)}
                href={`/pwa/coupon/${coupon.id}`}
                compact
              />
            ))
          )}
        </div>
      </section>

      <div className="mx-4 mt-3 border-t border-neutral-100" />

      <section className="px-4 pt-3">
        <SectionHeader title="지금 인기 할인" subtitle="상남동에서 많이 받는 쿠폰" />
        <div className="space-y-2.5">
          {message ? <SetupNotice message={message} /> : null}
          {isLoading ? (
            <>
              <CouponSkeleton />
              <CouponSkeleton />
              <CouponSkeleton />
            </>
          ) : (
            popularCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                image={coupon.image_url}
                title={coupon.title}
                store={coupon.store}
                discount={coupon.discount}
                expiresAt={formatExpiresAt(coupon.expires_at)}
                href={`/pwa/coupon/${coupon.id}`}
              />
            ))
          )}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-orange-50 p-4 text-[14px] font-bold leading-5 text-brand">
      {message}
    </div>
  );
}

function CouponSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="h-[122px] w-[146px] shrink-0 animate-pulse rounded-2xl bg-neutral-100" />
    );
  }

  return (
    <div className="h-[94px] animate-pulse rounded-2xl bg-neutral-100" />
  );
}
