import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CouponCardProps = {
  image: string;
  title: string;
  store: string;
  discount: string;
  expiresAt: string;
  distance?: string;
  compact?: boolean;
};

export function CouponCard({
  image,
  title,
  store,
  discount,
  expiresAt,
  distance,
  compact = false,
}: CouponCardProps) {
  if (compact) {
    return (
      <Card className="w-[160px] shrink-0 overflow-hidden rounded-2xl">
        <div
          className="relative h-24 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1.5 text-sm font-black text-white">
            {discount}
          </span>
        </div>
        <CardContent className="p-3">
          <p className="truncate text-[15px] font-black text-[#111111]">{store}</p>
          <p className="mt-1 line-clamp-1 text-[13px] font-bold text-[#111111]">{title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-neutral-500">
            <Clock className="h-3.5 w-3.5" />
            {expiresAt}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-[20px]">
      <CardContent className="flex gap-3 p-3">
        <div
          className="relative h-[92px] w-[92px] shrink-0 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-xs font-black text-white">
            {discount}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[17px] font-black leading-tight text-[#111111]">{title}</p>
          <p className="mt-1 truncate text-sm font-bold text-neutral-700">{store}</p>
          <div className="mt-2 space-y-1 text-xs font-semibold text-neutral-500">
            <p className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {expiresAt}
            </p>
            {distance ? (
              <p className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {distance}
              </p>
            ) : null}
          </div>
          <div className={cn("mt-3 flex justify-end")}>
            <Button size="sm">쿠폰받기</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
