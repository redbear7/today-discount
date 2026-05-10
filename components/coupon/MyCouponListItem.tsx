"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Coupon } from "@/lib/coupons";

type MyCouponListItemProps = {
  coupon: Coupon;
  used?: boolean;
  usedAt?: string;
};

export function MyCouponListItem({
  coupon,
  used = false,
  usedAt,
}: MyCouponListItemProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <CardContent className="flex gap-3 p-2.5">
        <Link
          href={`/coupons/${coupon.id}`}
          className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${coupon.image})` }}
          aria-label={`${coupon.title} 상세 보기`}
        >
          <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[11px] font-black text-white">
            {coupon.discount}
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/coupons/${coupon.id}`} className="min-w-0 text-inherit no-underline">
              <p className="truncate text-[16px] font-black leading-tight text-[#111111]">
                {coupon.title}
              </p>
              <p className="mt-0.5 truncate text-[13px] font-bold text-neutral-700">
                {coupon.store}
              </p>
            </Link>
            <StatusBadge used={used} />
          </div>

          <p className="mt-1.5 flex items-center gap-1 text-[12px] font-semibold text-neutral-500">
            {used ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            {used ? usedAt ?? "사용완료" : coupon.availableTime}
          </p>

          <div className="mt-2">
            {used ? (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="h-10 w-full text-[14px] text-neutral-500"
                disabled
              >
                사용완료
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="h-10 w-full text-[15px] shadow-[0_2px_8px_rgba(255,107,0,0.24)]"
              >
                사용완료
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ used }: { used: boolean }) {
  return (
    <span
      className={
        used
          ? "shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-black text-neutral-500"
          : "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-black text-brand"
      }
    >
      {used ? "완료" : "가능"}
    </span>
  );
}
