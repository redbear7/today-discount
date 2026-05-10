import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, ParkingCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { coupons, getCoupon } from "@/lib/coupons";

type CouponDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return coupons.map((coupon) => ({ id: coupon.id }));
}

export default async function CouponDetailPage({ params }: CouponDetailPageProps) {
  const { id } = await params;
  const coupon = getCoupon(id);

  if (!coupon) {
    notFound();
  }

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-24 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <section
        className="relative h-[216px] bg-cover bg-center"
        style={{ backgroundImage: `url(${coupon.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
        <Link
          href="/"
          aria-label="뒤로가기"
          className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#111111] shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </Link>
        <span className="absolute bottom-3 left-4 rounded-full bg-brand px-4 py-2 text-lg font-[760] text-white shadow-[0_4px_12px_rgba(255,107,0,0.28)]">
          {coupon.discount}
        </span>
      </section>

      <section className="px-4 pt-4">
        <p className="text-sm font-[700] text-brand">{coupon.store}</p>
        <h1 className="mt-1 text-[23px] font-[780] leading-tight tracking-normal">
          {coupon.title}
        </h1>
        <p className="mt-2 text-[15px] font-semibold leading-6 text-neutral-600">
          {coupon.description}
        </p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-2 px-4">
        <SummaryCard label="할인" value={coupon.discount} tone="brand" />
        <SummaryCard label="마감" value={coupon.expiresAt} />
      </section>

      <section className="mt-3 space-y-2.5 px-4">
        <InfoRow icon={<Store className="h-5 w-5" />} label="매장" value={coupon.store} />
        <InfoRow icon={<Clock className="h-5 w-5" />} label="사용 가능 시간" value={coupon.availableTime} />
        <InfoRow icon={<MapPin className="h-5 w-5" />} label="주소" value={coupon.address} />
        <InfoRow icon={<ParkingCircle className="h-5 w-5" />} label="주차" value={coupon.parking} />
      </section>

      <section className="mx-4 mt-3 rounded-[20px] bg-[#F5F5F5] p-4">
        <p className="text-[15px] font-[700]">사용 방법</p>
        <ol className="mt-2 space-y-1.5 text-sm font-semibold text-neutral-600">
          <li>1. 쿠폰받기 버튼을 누릅니다.</li>
          <li>2. 매장에서 쿠폰 화면을 보여줍니다.</li>
          <li>3. 직원 확인 후 사용완료를 누릅니다.</li>
        </ol>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-neutral-200 bg-white/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur">
        <Button className="h-14 w-full text-base shadow-[0_4px_14px_rgba(255,107,0,0.28)]">쿠폰받기</Button>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "brand";
}) {
  return (
    <Card className="rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <CardContent className="p-3">
        <p className="text-xs font-bold text-neutral-500">{label}</p>
        <p className={`mt-1 text-[18px] font-[760] leading-tight ${tone === "brand" ? "text-brand" : "text-[#111111]"}`}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-[20px] border border-neutral-200 bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-50 text-brand">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-neutral-500">{label}</p>
        <p className="mt-0.5 text-[15px] font-[700] leading-snug text-[#111111]">{value}</p>
      </div>
    </div>
  );
}
