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
        <Card className="w-[146px] shrink-0 overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div
            className="relative h-16 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[13px] font-[760] leading-none text-white">
              {discount}
            </span>
          </div>
          <CardContent className="px-2.5 py-2">
            <p className="truncate text-[14px] font-[760] leading-tight text-[#111111]">{store}</p>
            <p className="mt-0.5 line-clamp-1 text-[12px] font-[500] leading-tight text-[#111111]">{title}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-[400] text-neutral-500">
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
      <Card className="overflow-hidden rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <CardContent className="flex gap-3 px-2.5 py-2">
          <div
            className="relative h-[72px] w-[72px] shrink-0 rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <span className="absolute left-1.5 top-1.5 rounded-full bg-brand px-2 py-0.5 text-[12px] font-[760] text-white">
              {discount}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[16px] font-[760] leading-tight text-[#111111]">{title}</p>
                <p className="mt-0.5 truncate text-[13px] font-[430] text-neutral-600">{store}</p>
              </div>
              {href ? (
                <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-2xl bg-brand px-3.5 text-[13px] font-[760] text-white shadow-[0_2px_6px_rgba(255,107,0,0.22)]">
                  받기
                </span>
              ) : (
                <Button size="sm" className="h-8 shrink-0 rounded-2xl px-3.5 text-[13px] font-[760] shadow-[0_2px_6px_rgba(255,107,0,0.22)]">받기</Button>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[12px] font-[430] text-neutral-500">
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
