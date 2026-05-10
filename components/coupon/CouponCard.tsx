import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type CouponCardProps = {
  image: string;
  title: string;
  store: string;
  discount: string;
  expiresAt: string;
  distance?: string;
  compact?: boolean;
  href?: string;
};

export function CouponCard({
  image,
  title,
  store,
  discount,
  expiresAt,
  distance,
  compact = false,
  href,
}: CouponCardProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <Link href={href} className="block text-inherit no-underline">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  if (compact) {
    return (
      <Wrapper>
        <Card className="w-[146px] shrink-0 overflow-hidden rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
          <div
            className="relative h-16 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-xs font-black text-white">
              {discount}
            </span>
          </div>
          <CardContent className="p-2.5 pt-2">
            <p className="truncate text-[14px] font-black leading-tight text-[#111111]">{store}</p>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-[#111111]">{title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-neutral-500">
              <Clock className="h-3.5 w-3.5" />
              {expiresAt}
            </p>
          </CardContent>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card className="overflow-hidden rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
        <CardContent className="flex gap-3 p-2.5">
          <div
            className="relative h-[72px] w-[72px] shrink-0 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[11px] font-black text-white">
              {discount}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[16px] font-black leading-tight text-[#111111]">{title}</p>
                <p className="mt-0.5 truncate text-[13px] font-bold text-neutral-700">{store}</p>
              </div>
              {href ? (
                <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-2xl bg-brand px-3 text-[12px] font-black text-white">
                  받기
                </span>
              ) : (
                <Button size="sm" className="h-8 shrink-0 rounded-2xl px-3 text-[12px]">받기</Button>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] font-semibold text-neutral-500">
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
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
