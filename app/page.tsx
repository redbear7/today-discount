import { Bell, ChevronDown } from "lucide-react";
import { CouponCard } from "@/components/coupon/CouponCard";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { SearchBar } from "@/components/SearchBar";

const images = {
  fish: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=640&q=80",
  chicken: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=640&q=80",
  cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=640&q=80",
  sushi: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=640&q=80",
  noodle: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=80",
};

const endingSoon = [
  {
    image: images.fish,
    title: "점심특선 30% 할인",
    store: "낭만굴비",
    discount: "30%",
    expiresAt: "오후 3시까지",
  },
  {
    image: images.chicken,
    title: "치킨 세트 오늘특가",
    store: "상남치킨",
    discount: "40%",
    expiresAt: "오후 6시까지",
  },
  {
    image: images.cafe,
    title: "아메리카노 1+1",
    store: "오늘카페",
    discount: "1+1",
    expiresAt: "오후 5시까지",
  },
];

const popular = [
  {
    image: images.sushi,
    title: "오마카세 런치 35% 할인",
    store: "스시오늘 상남",
    discount: "35%",
    expiresAt: "오늘 오후 2시까지",
    distance: "상남동 · 450m",
  },
  {
    image: images.noodle,
    title: "냉면 한그릇 특가",
    store: "명동온면",
    discount: "25%",
    expiresAt: "오늘 오후 8시까지",
    distance: "중앙동 · 800m",
  },
  {
    image: images.chicken,
    title: "저녁 치킨세트 할인",
    store: "상남치킨",
    discount: "40%",
    expiresAt: "오늘 오후 9시까지",
    distance: "상남동 · 320m",
  },
];

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
          {endingSoon.map((coupon) => (
            <CouponCard key={coupon.store} {...coupon} compact />
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
          {popular.map((coupon) => (
            <CouponCard key={coupon.title} {...coupon} />
          ))}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
