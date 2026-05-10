"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getOrCreateGuestUserId } from "@/lib/guest-user";
import { getSupabaseClient } from "@/lib/supabase";

export function ReceiveCouponButton({ couponId }: { couponId: string }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function receiveCoupon() {
    setIsSaving(true);
    const supabase = getSupabaseClient();

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured.");
      }

      const userId = await getOrCreateGuestUserId();
      const { error } = await supabase
        .from("coupon_usage")
        .upsert(
          {
            user_id: userId,
            coupon_id: couponId,
            status: "received",
          },
          { onConflict: "user_id,coupon_id", ignoreDuplicates: true }
        );

      if (error) throw error;

      router.push("/pwa/my-coupons");
    } catch {
      alert("쿠폰을 받을 수 없습니다. Supabase 설정을 확인해주세요.");
      setIsSaving(false);
    }
  }

  return (
    <Button
      className="h-14 w-full text-base shadow-[0_4px_14px_rgba(255,107,0,0.28)]"
      disabled={isSaving}
      onClick={receiveCoupon}
    >
      {isSaving ? "받는 중..." : "쿠폰받기"}
    </Button>
  );
}
