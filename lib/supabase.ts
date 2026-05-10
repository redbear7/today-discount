import { createClient } from "@supabase/supabase-js";

export type CouponRow = {
  id: string;
  title: string;
  store: string;
  discount: string;
  expires_at: string;
  image_url: string;
  created_at: string;
};

export type CouponUsageStatus = "received" | "used";

export type CouponUsageRow = {
  id: string;
  user_id: string;
  coupon_id: string;
  status: CouponUsageStatus;
  created_at: string;
  coupons?: CouponRow | null;
};

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

export function formatExpiresAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "오늘 사용 가능";

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date) + "까지";
}

export function formatAvailableTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "오늘 사용 가능";

  return `오늘 ${new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(date)}까지`;
}
