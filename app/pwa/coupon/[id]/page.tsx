import { CouponDetailClient } from "@/components/coupon/CouponDetailClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PwaCouponDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <CouponDetailClient couponId={id} />;
}
