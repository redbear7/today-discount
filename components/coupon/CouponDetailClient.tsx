"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, MapPin, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReceiveCouponButton } from "@/components/coupon/ReceiveCouponButton";
import { CouponRow, formatAvailableTime, formatExpiresAt, getSupabaseClient } from "@/lib/supabase";

export function CouponDetailClient({ couponId }: { couponId: string }) {
  const [coupon, setCoupon] = useState<CouponRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function loadCoupon() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setMessage("Supabase 환경변수를 설정해주세요.");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("coupons")
        .select("id,title,store,description,discount,start_at,expires_at,image_url,owner_id,created_at")
        .eq("id", couponId)
        .single();

      if (!alive) return;

      if (error || !data) {
        setMessage("쿠폰을 찾을 수 없습니다.");
        setIsLoading(false);
        return;
      }

      setCoupon(data);
      setIsLoading(false);
    }

    loadCoupon();
    return () => {
      alive = false;
    };
  }, [couponId]);

  if (isLoading) {
    return <DetailShell><div className="h-[640px] animate-pulse bg-neutral-100" /></DetailShell>;
  }

  if (!coupon) {
    return (
      <DetailShell>
        <div className="p-4">
          <p className="rounded-2xl bg-orange-50 p-4 text-[15px] font-bold text-brand">
            {message ?? "쿠폰을 불러올 수 없습니다."}
          </p>
        </div>
      </DetailShell>
    );
  }

  return (
    <DetailShell>
      <section
        className="relative h-[216px] bg-cover bg-center"
        style={{ backgroundImage: `url(${coupon.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
        <Link
          href="/pwa/home"
          aria-label="뒤로가기"
          className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#111111] shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </Link>
        <span className="absolute bottom-3 left-4 rounded-full bg-brand px-4 py-2 text-lg font-[760] text-white shadow-[0_4px_12px_rgba(255,107,0,0.28)]">
          {coupon.discount}
        </span>
      </section>

      <section className="px-4 pt-4">
        <p className="text-sm font-[700] text-brand">{coupon.store}</p>
        <h1 className="mt-1 text-[23px] font-[780] leading-tight tracking-normal">
          {coupon.title}
        </h1>
        <p className="mt-2 text-[15px] font-[430] leading-6 text-neutral-600">
          오늘 바로 사용할 수 있는 동네 할인 쿠폰입니다. 매장에서 쿠폰 화면을 보여주세요.
        </p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-2 px-4">
        <SummaryCard label="할인" value={coupon.discount} tone="brand" />
        <SummaryCard label="마감" value={formatExpiresAt(coupon.expires_at)} />
      </section>

      <section className="mt-3 space-y-2.5 px-4">
        <InfoRow icon={<Store className="h-5 w-5" />} label="매장" value={coupon.store} />
        <InfoRow icon={<Clock className="h-5 w-5" />} label="사용 가능 시간" value={formatAvailableTime(coupon.expires_at)} />
        <InfoRow icon={<MapPin className="h-5 w-5" />} label="주소" value="매장 방문 전 위치를 확인해주세요" />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-neutral-200 bg-white/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur">
        <ReceiveCouponButton couponId={coupon.id} />
      </div>
    </DetailShell>
  );
}

function DetailShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-24 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </main>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "brand";
}) {
  return (
    <Card className="rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <CardContent className="p-3">
        <p className="text-xs font-bold text-neutral-500">{label}</p>
        <p className={`mt-1 text-[18px] font-[760] leading-tight ${tone === "brand" ? "text-brand" : "text-[#111111]"}`}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-[20px] border border-neutral-200 bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-50 text-brand">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-neutral-500">{label}</p>
        <p className="mt-0.5 text-[15px] font-[700] leading-snug text-[#111111]">{value}</p>
      </div>
    </div>
  );
}
