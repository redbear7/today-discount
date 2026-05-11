import { MapPin, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Restaurant } from "@/lib/restaurants";

type RestaurantCardProps = {
  restaurant: Restaurant;
  rank: number;
  score: number;
};

export function RestaurantCard({ restaurant, rank, score }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <CardContent className="flex gap-3 p-2.5">
        <div
          className="relative h-[88px] w-[88px] shrink-0 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.thumbnail})` }}
        >
          <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[11px] font-[760] text-white">
            TOP {rank}
          </span>
          {restaurant.couponLabel ? (
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/75 px-2 py-0.5 text-[11px] font-[700] text-white">
              쿠폰 {restaurant.couponLabel}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[16px] font-[760] leading-tight text-[#111111]">
                {restaurant.name}
              </p>
              <p className="mt-1 flex items-center gap-1 text-[12px] font-[430] text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                {restaurant.area} · {restaurant.category}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-[700] text-brand">
              {score}점
            </span>
          </div>

          <p className="mt-1.5 line-clamp-2 text-[13px] font-[500] leading-5 text-[#111111]">
            {restaurant.recommendedFor}
          </p>
          <div className="mt-1.5 flex items-center gap-1 text-[12px] font-[430] text-neutral-500">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            {restaurant.strengths.slice(0, 2).join(" · ")}
          </div>
          <p className="mt-1 text-[12px] font-[500] text-neutral-500">
            {restaurant.priceRange}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
