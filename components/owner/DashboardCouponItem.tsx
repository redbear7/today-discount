import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CouponRow, formatExpiresAt } from "@/lib/supabase";

type DashboardCouponItemProps = {
  coupon: CouponRow;
  usageCount: number;
};

export function DashboardCouponItem({ coupon, usageCount }: DashboardCouponItemProps) {
  return (
    <Card className="rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <CardContent className="flex gap-3 p-2.5">
        <div
          className="relative h-[64px] w-[64px] shrink-0 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${coupon.image_url})` }}
        >
          <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[11px] font-[760] text-white">
            {coupon.discount}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-[760] leading-tight text-[#111111]">
                {coupon.title}
              </p>
              <p className="mt-1 flex items-center gap-1 text-[12px] font-[430] text-neutral-500">
                <Clock className="h-3.5 w-3.5" />
                {formatExpiresAt(coupon.expires_at)}
              </p>
            </div>
            <div className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[12px] font-[700] text-brand">
              {usageCount}회
            </div>
          </div>
          <p className="mt-2 line-clamp-1 text-[12px] font-[430] text-neutral-500">
            {coupon.description || "등록된 설명 없음"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
