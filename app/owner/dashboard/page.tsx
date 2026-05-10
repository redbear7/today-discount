"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LogOut, Plus } from "lucide-react";
import { DashboardCouponItem } from "@/components/owner/DashboardCouponItem";
import { StatCard } from "@/components/owner/StatCard";
import { CouponRow, CouponUsageRow, getSupabaseClient } from "@/lib/supabase";

type UsageStats = {
  todayUsed: number;
  totalUsed: number;
  usageByCoupon: Record<string, number>;
};

export default function OwnerDashboardPage() {
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [stats, setStats] = useState<UsageStats>({
    todayUsed: 0,
    totalUsed: 0,
    usageByCoupon: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 먼저 설정해주세요.");
      setIsLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      window.location.href = "/owner/login";
      return;
    }

    const { data: couponData, error: couponError } = await supabase
      .from("coupons")
      .select("id,title,store,description,discount,start_at,expires_at,image_url,owner_id,created_at")
      .eq("owner_id", userData.user.id)
      .order("expires_at", { ascending: true });

    if (couponError) {
      setMessage("쿠폰 목록을 불러오지 못했습니다.");
      setIsLoading(false);
      return;
    }

    const ownerCoupons = (couponData ?? []) as CouponRow[];
    setCoupons(ownerCoupons);

    if (ownerCoupons.length === 0) {
      setIsLoading(false);
      return;
    }

    const couponIds = ownerCoupons.map((coupon) => coupon.id);
    const { data: usageData, error: usageError } = await supabase
      .from("coupon_usage")
      .select("id,user_id,coupon_id,status,created_at")
      .in("coupon_id", couponIds)
      .eq("status", "used");

    if (usageError) {
      setMessage("사용 통계를 불러오지 못했습니다.");
      setIsLoading(false);
      return;
    }

    setStats(calculateStats((usageData ?? []) as CouponUsageRow[]));
    setIsLoading(false);
  }

  async function logout() {
    const supabase = getSupabaseClient();
    await supabase?.auth.signOut();
    window.location.href = "/owner/login";
  }

  const now = new Date();
  const activeCoupons = coupons.filter((coupon) => new Date(coupon.expires_at) >= now);
  const expiredCoupons = coupons.filter((coupon) => new Date(coupon.expires_at) < now);
  const mostUsedCoupon = useMemo(() => {
    return coupons.reduce<CouponRow | null>((topCoupon, coupon) => {
      if (!topCoupon) return coupon;
      return (stats.usageByCoupon[coupon.id] ?? 0) > (stats.usageByCoupon[topCoupon.id] ?? 0)
        ? coupon
        : topCoupon;
    }, null);
  }, [coupons, stats.usageByCoupon]);

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-6 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-14 items-center justify-between">
          <div>
            <p className="text-[12px] font-[700] text-brand">사장님</p>
            <h1 className="text-[20px] font-[780] leading-tight">쿠폰 대시보드</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="grid h-10 w-10 place-items-center rounded-full text-neutral-500"
            aria-label="로그아웃"
          >
            <LogOut className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <section className="px-4 pt-3">
        <Link
          href="/owner/coupons/create"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-[15px] font-[700] text-white"
        >
          <Plus className="h-5 w-5" />
          새 쿠폰 등록
        </Link>
      </section>

      <section className="grid grid-cols-3 gap-2 px-4 pt-3">
        <StatCard label="오늘 사용" value={stats.todayUsed} caption="완료 기준" />
        <StatCard label="총 사용" value={stats.totalUsed} caption="누적" />
        <StatCard
          label="인기 쿠폰"
          value={mostUsedCoupon ? (stats.usageByCoupon[mostUsedCoupon.id] ?? 0) : 0}
          caption={mostUsedCoupon?.title ?? "없음"}
        />
      </section>

      {message ? (
        <section className="px-4 pt-3">
          <div className="rounded-2xl bg-orange-50 p-4 text-[14px] font-[700] text-brand">
            {message}
          </div>
        </section>
      ) : null}

      <CouponSection
        title="진행중 쿠폰"
        emptyText={isLoading ? "불러오는 중..." : "진행중 쿠폰이 없습니다."}
        coupons={activeCoupons}
        usageByCoupon={stats.usageByCoupon}
      />

      <CouponSection
        title="종료된 쿠폰"
        emptyText={isLoading ? "불러오는 중..." : "종료된 쿠폰이 없습니다."}
        coupons={expiredCoupons}
        usageByCoupon={stats.usageByCoupon}
      />
    </main>
  );
}

function CouponSection({
  title,
  emptyText,
  coupons,
  usageByCoupon,
}: {
  title: string;
  emptyText: string;
  coupons: CouponRow[];
  usageByCoupon: Record<string, number>;
}) {
  return (
    <section className="px-4 pt-4">
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-[18px] font-[780] leading-tight">{title}</h2>
        <span className="text-[13px] font-[500] text-neutral-500">{coupons.length}개</span>
      </div>
      <div className="space-y-2">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <DashboardCouponItem
              key={coupon.id}
              coupon={coupon}
              usageCount={usageByCoupon[coupon.id] ?? 0}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-[#F5F5F5] p-4 text-[14px] font-[500] text-neutral-500">
            {emptyText}
          </div>
        )}
      </div>
    </section>
  );
}

function calculateStats(usages: CouponUsageRow[]): UsageStats {
  const todayKey = new Date().toDateString();
  const usageByCoupon: Record<string, number> = {};
  let todayUsed = 0;

  usages.forEach((usage) => {
    usageByCoupon[usage.coupon_id] = (usageByCoupon[usage.coupon_id] ?? 0) + 1;

    if (new Date(usage.created_at).toDateString() === todayKey) {
      todayUsed += 1;
    }
  });

  return {
    todayUsed,
    totalUsed: usages.length,
    usageByCoupon,
  };
}
