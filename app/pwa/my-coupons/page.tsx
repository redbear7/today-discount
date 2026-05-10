"use client";

import { useEffect, useMemo, useState } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CouponListItem } from "@/components/coupon/CouponListItem";
import { getStoredGuestUserId } from "@/lib/guest-user";
import { CouponRow, CouponUsageRow, getSupabaseClient } from "@/lib/supabase";

type Tab = "available" | "used";

type UsageWithCoupon = Omit<CouponUsageRow, "coupons"> & {
  coupons: CouponRow | CouponRow[] | null;
};

export default function PwaMyCouponsPage() {
  const [tab, setTab] = useState<Tab>("available");
  const [items, setItems] = useState<UsageWithCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function loadItems() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 설정하면 받은 쿠폰이 표시됩니다.");
      setIsLoading(false);
      return;
    }

    const userId = getStoredGuestUserId();
    if (!userId) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("coupon_usage")
      .select("id,user_id,coupon_id,status,created_at,coupons(id,title,store,discount,expires_at,image_url,created_at)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("내 쿠폰을 불러오지 못했습니다.");
      setIsLoading(false);
      return;
    }

    setItems((data ?? []) as unknown as UsageWithCoupon[]);
    setIsLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  const availableItems = useMemo(
    () => items.filter((item) => item.status === "received" && normalizeCoupon(item.coupons)),
    [items]
  );
  const usedItems = useMemo(
    () => items.filter((item) => item.status === "used" && normalizeCoupon(item.coupons)),
    [items]
  );

  async function markUsed(usageId: string) {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setItems((current) =>
      current.map((item) =>
        item.id === usageId ? { ...item, status: "used" } : item
      )
    );

    const { error } = await supabase
      .from("coupon_usage")
      .update({ status: "used" })
      .eq("id", usageId);

    if (error) {
      await loadItems();
    }
  }

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-20 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center justify-between">
          <div>
            <h1 className="text-[20px] font-black tracking-[-0.04em]">내 쿠폰</h1>
            <p className="text-[12px] font-semibold text-neutral-500">받은 쿠폰을 바로 사용하세요</p>
          </div>
          <div className="rounded-full bg-orange-50 px-3 py-1.5 text-[13px] font-black text-brand">
            {availableItems.length}개 가능
          </div>
        </div>
      </header>

      <section className="px-4 pt-3">
        <div className="grid grid-cols-2 rounded-2xl bg-[#F5F5F5] p-1">
          <TabButton
            active={tab === "available"}
            label={`사용 가능 ${availableItems.length}`}
            onClick={() => setTab("available")}
          />
          <TabButton
            active={tab === "used"}
            label={`사용 완료 ${usedItems.length}`}
            onClick={() => setTab("used")}
          />
        </div>
      </section>

      <section className="px-4 pt-3">
        <div className="space-y-2.5">
          {message ? <Notice message={message} /> : null}
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : tab === "available" ? (
            availableItems.length > 0 ? (
              availableItems.map((item) => {
                const coupon = normalizeCoupon(item.coupons);
                if (!coupon) return null;
                return (
                  <CouponListItem
                    key={item.id}
                    usageId={item.id}
                    coupon={coupon}
                    status={item.status}
                    onMarkUsed={markUsed}
                  />
                );
              })
            ) : (
              <Notice message="아직 받은 쿠폰이 없습니다. 홈에서 쿠폰을 받아보세요." />
            )
          ) : usedItems.length > 0 ? (
            usedItems.map((item) => {
              const coupon = normalizeCoupon(item.coupons);
              if (!coupon) return null;
              return (
                <CouponListItem
                  key={item.id}
                  usageId={item.id}
                  coupon={coupon}
                  status={item.status}
                />
              );
            })
          ) : (
            <Notice message="사용 완료한 쿠폰이 없습니다." />
          )}
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}

function normalizeCoupon(value: CouponRow | CouponRow[] | null) {
  if (Array.isArray(value)) return value[0] ?? null;
  return value;
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "h-10 rounded-xl bg-white text-[14px] font-black text-brand shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
          : "h-10 rounded-xl text-[14px] font-black text-neutral-500"
      }
    >
      {label}
    </button>
  );
}

function Notice({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-orange-50 p-4 text-[14px] font-bold leading-5 text-brand">
      {message}
    </div>
  );
}

function Skeleton() {
  return <div className="h-[124px] animate-pulse rounded-2xl bg-neutral-100" />;
}
