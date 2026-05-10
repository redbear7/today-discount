import { Bell, ChevronDown } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SearchBar } from "@/components/SearchBar";
import { endingSoonCoupons, popularCoupons } from "@/lib/coupons";

export default function Home() {
  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-24 text-[#111111]">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-6 backdrop-blur">
        <div className="flex h-14 items-center justify-between">
          <button className="flex items-center gap-1.5 text-[19px] font-black tracking-[-0.03em]" type="button">
            창원 상남동
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </button>
          <button className="relative grid h-10 w-10 place-items-center rounded-full" type="button" aria-label="알림">
            <Bell className="h-6 w-6" strokeWidth={2.5} />
            <span className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full bg-brand" />
          </button>
        </div>
      </header>

      <div className="px-6 pt-4">
        <SearchBar />
      </div>

      <section className="pt-10">
        <div className="mb-5 flex items-end justify-between px-6">
          <div>
            <h1 className="text-[22px] font-black tracking-[-0.04em]">오늘 마감 할인</h1>
            <p className="mt-1 text-[15px] font-semibold text-neutral-500">3초 안에 보고 바로 받기</p>
          </div>
          <button className="text-sm font-bold text-neutral-500" type="button">더보기</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {endingSoonCoupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} href={`/coupons/${coupon.id}`} compact />
          ))}
        </div>
      </section>

      <div className="mx-6 mt-8 border-t border-neutral-100" />

      <section className="px-6 pt-7">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[22px] font-black tracking-[-0.04em]">지금 인기 할인</h2>
            <p className="mt-1 text-[15px] font-semibold text-neutral-500">상남동에서 많이 받는 쿠폰</p>
          </div>
          <button className="text-sm font-bold text-neutral-500" type="button">더보기</button>
        </div>
        <div className="space-y-4">
          {popularCoupons.map((coupon) => (
            <CouponCard key={coupon.id} {...coupon} href={`/coupons/${coupon.id}`} />
          ))}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
