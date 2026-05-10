"use client";

import { useState } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { MyCouponListItem } from "@/components/coupon/MyCouponListItem";
import { coupons } from "@/lib/coupons";

const availableCoupons = [coupons[3], coupons[1], coupons[5], coupons[0]];
const usedCoupons = [
  { coupon: coupons[4], usedAt: "오늘 12:42 사용" },
  { coupon: coupons[2], usedAt: "어제 16:10 사용" },
];

type Tab = "available" | "used";

export default function MyCouponsPage() {
  const [tab, setTab] = useState<Tab>("available");
  const availableCount = availableCoupons.length;
  const usedCount = usedCoupons.length;

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-20 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center justify-between">
          <div>
            <h1 className="text-[20px] font-black tracking-[-0.04em]">내 쿠폰</h1>
            <p className="text-[12px] font-semibold text-neutral-500">받은 쿠폰을 바로 사용하세요</p>
          </div>
          <div className="rounded-full bg-orange-50 px-3 py-1.5 text-[13px] font-black text-brand">
            {availableCount}개 가능
          </div>
        </div>
      </header>

      <section className="px-4 pt-3">
        <div className="grid grid-cols-2 rounded-2xl bg-[#F5F5F5] p-1">
          <TabButton
            active={tab === "available"}
            label={`사용 가능 ${availableCount}`}
            onClick={() => setTab("available")}
          />
          <TabButton
            active={tab === "used"}
            label={`사용 완료 ${usedCount}`}
            onClick={() => setTab("used")}
          />
        </div>
      </section>

      <section className="px-4 pt-3">
        <div className="space-y-2.5">
          {tab === "available"
            ? availableCoupons.map((coupon) => (
                <MyCouponListItem key={coupon.id} coupon={coupon} />
              ))
            : usedCoupons.map(({ coupon, usedAt }) => (
                <MyCouponListItem key={coupon.id} coupon={coupon} used usedAt={usedAt} />
              ))}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "h-10 rounded-xl bg-white text-[14px] font-black text-brand shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
          : "h-10 rounded-xl text-[14px] font-black text-neutral-500"
      }
    >
      {label}
    </button>
  );
}
