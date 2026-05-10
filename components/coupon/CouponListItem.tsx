"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CouponRow, CouponUsageStatus, formatAvailableTime } from "@/lib/supabase";

type CouponListItemProps = {
  usageId: string;
  coupon: CouponRow;
  status: CouponUsageStatus;
  onMarkUsed?: (usageId: string) => void;
};

export function CouponListItem({
  usageId,
  coupon,
  status,
  onMarkUsed,
}: CouponListItemProps) {
  const used = status === "used";

  return (
    <Card className="overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <CardContent className="flex gap-3 p-2.5">
        <Link
          href={`/pwa/coupon/${coupon.id}`}
          className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${coupon.image_url})` }}
          aria-label={`${coupon.title} 상세 보기`}
        >
          <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[11px] font-[760] text-white">
            {coupon.discount}
          </span>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/pwa/coupon/${coupon.id}`} className="min-w-0 text-inherit no-underline">
              <p className="truncate text-[16px] font-[760] leading-tight text-[#111111]">
                {coupon.title}
              </p>
              <p className="mt-0.5 truncate text-[13px] font-[430] text-neutral-600">
                {coupon.store}
              </p>
            </Link>
            <StatusBadge used={used} />
          </div>

          <p className="mt-1.5 flex items-center gap-1 text-[12px] font-[430] text-neutral-500">
            {used ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            {used ? "사용 완료됨" : formatAvailableTime(coupon.expires_at)}
          </p>

          <div className="mt-2">
            <Button
              type="button"
              size="sm"
              variant={used ? "secondary" : "default"}
              className={
                used
                  ? "h-10 w-full text-[14px] text-neutral-500"
                  : "h-10 w-full text-[15px] font-[760] shadow-[0_2px_8px_rgba(255,107,0,0.24)]"
              }
              disabled={used}
              onClick={() => onMarkUsed?.(usageId)}
            >
              사용완료
            </Button>
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
          ? "shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-[700] text-neutral-500"
          : "shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-[700] text-brand"
      }
    >
      {used ? "완료" : "가능"}
    </span>
  );
}
