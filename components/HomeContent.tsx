import { Bell, ChevronDown } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SearchBar } from "@/components/SearchBar";
import { endingSoonCoupons, popularCoupons } from "@/lib/coupons";

export function HomeContent() {
  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-20 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center justify-between">
          <button className="flex h-10 items-center gap-1.5 text-[18px] font-black tracking-[-0.03em]" type="button">
            창원 상남동
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </button>
          <button className="relative grid h-10 w-10 place-items-center rounded-full" type="button" aria-label="알림">
            <Bell className="h-5 w-5" strokeWidth={2.5} />
            <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-brand" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-3">
        <SearchBar />
      </div>

      <section className="pt-5">
        <div className="mb-3 flex items-end justify-between px-4">
          <div>
            <h1 className="text-[20px] font-black tracking-[-0.04em]">오늘 마감 할인</h1>
            <p className="mt-0.5 text-[13px] font-semibold text-neutral-500">3초 안에 보고 바로 받기</p>
          </div>
          <button className="h-9 px-1 text-[13px] font-bold text-neutral-500" type="button">더보기</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {endingSoonCoupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} href={`/coupons/${coupon.id}`} compact />
          ))}
        </div>
      </section>

      <div className="mx-4 mt-5 border-t border-neutral-100" />

      <section className="px-4 pt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-black tracking-[-0.04em]">지금 인기 할인</h2>
            <p className="mt-0.5 text-[13px] font-semibold text-neutral-500">상남동에서 많이 받는 쿠폰</p>
          </div>
          <button className="h-9 px-1 text-[13px] font-bold text-neutral-500" type="button">더보기</button>
        </div>
        <div className="space-y-2.5">
          {popularCoupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} href={`/coupons/${coupon.id}`} />
          ))}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
