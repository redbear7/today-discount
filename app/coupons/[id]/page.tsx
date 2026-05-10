import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, ParkingCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-28 text-[#111111]">
      <section
        className="relative h-[260px] bg-cover bg-center"
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
        <span className="absolute bottom-4 left-4 rounded-full bg-brand px-4 py-2 text-lg font-black text-white shadow-sm">
          {coupon.discount}
        </span>
      </section>

      <section className="px-5 pt-5">
        <p className="text-sm font-bold text-brand">{coupon.store}</p>
        <h1 className="mt-1 text-[26px] font-black leading-tight tracking-[-0.04em]">
          {coupon.title}
        </h1>
        <p className="mt-3 text-[15px] font-semibold leading-6 text-neutral-600">
          {coupon.description}
        </p>
      </section>

      <section className="mt-5 space-y-3 px-5">
        <InfoRow icon={<Clock className="h-5 w-5" />} label="사용 가능 시간" value={coupon.availableTime} />
        <InfoRow icon={<MapPin className="h-5 w-5" />} label="매장 주소" value={coupon.address} />
        <InfoRow icon={<ParkingCircle className="h-5 w-5" />} label="주차" value={coupon.parking} />
      </section>

      <section className="mx-5 mt-5 rounded-[20px] bg-[#F5F5F5] p-4">
        <p className="text-[15px] font-black">사용 방법</p>
        <ol className="mt-3 space-y-2 text-sm font-semibold text-neutral-600">
          <li>1. 쿠폰받기 버튼을 누릅니다.</li>
          <li>2. 매장에서 쿠폰 화면을 보여줍니다.</li>
          <li>3. 직원 확인 후 사용완료를 누릅니다.</li>
        </ol>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-neutral-200 bg-white/95 p-4 pb-[calc(16px+env(safe-area-inset-bottom))] backdrop-blur">
        <Button className="h-14 w-full text-base">쿠폰받기</Button>
      </div>
    </main>
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
    <div className="flex gap-3 rounded-[20px] border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-orange-50 text-brand">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-neutral-500">{label}</p>
        <p className="mt-1 text-[15px] font-black leading-snug text-[#111111]">{value}</p>
      </div>
    </div>
  );
}
