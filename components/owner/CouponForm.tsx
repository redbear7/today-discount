"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Percent, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/owner/ImageUploader";
import { getSupabaseClient } from "@/lib/supabase";

type CouponFormProps = {
  ownerId: string;
  ownerEmail?: string;
};

type FormState = {
  title: string;
  description: string;
  discount: string;
  startAt: string;
  endAt: string;
  imageUrl: string;
};

export function CouponForm({ ownerId, ownerEmail }: CouponFormProps) {
  const router = useRouter();
  const initialDates = useMemo(() => getInitialDates(), []);
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    discount: "30%",
    startAt: initialDates.startAt,
    endAt: initialDates.endAt,
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitCoupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!form.title.trim()) {
      setMessage("쿠폰 제목을 입력해주세요.");
      return;
    }

    if (!form.discount.trim()) {
      setMessage("할인율을 입력해주세요.");
      return;
    }

    if (!form.startAt || !form.endAt || new Date(form.startAt) >= new Date(form.endAt)) {
      setMessage("시작/종료 시간을 확인해주세요.");
      return;
    }

    if (!form.imageUrl) {
      setMessage("쿠폰 이미지를 업로드해주세요.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 먼저 설정해주세요.");
      return;
    }

    setIsSubmitting(true);

    const storeName = ownerEmail?.split("@")[0] || "내 매장";
    const { error } = await supabase.from("coupons").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      discount: form.discount.trim(),
      start_at: new Date(form.startAt).toISOString(),
      expires_at: new Date(form.endAt).toISOString(),
      image_url: form.imageUrl,
      owner_id: ownerId,
      store: storeName,
    });

    if (error) {
      setMessage("쿠폰 등록에 실패했습니다. DB 권한과 스키마를 확인해주세요.");
      setIsSubmitting(false);
      return;
    }

    router.push("/owner/dashboard");
  }

  return (
    <form onSubmit={submitCoupon} className="pb-24">
      <div className="space-y-3 px-4 pt-3">
        <Field label="쿠폰 제목" icon={<Type className="h-4 w-4" />}>
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="예: 점심특선 30% 할인"
            className="h-11 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
          />
        </Field>

        <Field label="할인 내용">
          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="예: 오늘 오후 3시까지 매장 방문 고객"
            rows={3}
            className="w-full resize-none rounded-2xl bg-[#F5F5F5] px-4 py-3 text-[15px] font-[430] leading-5 outline-none placeholder:text-neutral-500"
          />
        </Field>

        <Field label="할인율" icon={<Percent className="h-4 w-4" />}>
          <input
            value={form.discount}
            onChange={(event) => updateField("discount", event.target.value)}
            placeholder="30%"
            className="h-11 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
          />
        </Field>

        <div className="grid grid-cols-2 gap-2">
          <Field label="시작" icon={<CalendarClock className="h-4 w-4" />}>
            <input
              type="datetime-local"
              value={form.startAt}
              onChange={(event) => updateField("startAt", event.target.value)}
              className="h-11 w-full rounded-2xl bg-[#F5F5F5] px-3 text-[13px] font-[500] outline-none"
            />
          </Field>
          <Field label="종료">
            <input
              type="datetime-local"
              value={form.endAt}
              onChange={(event) => updateField("endAt", event.target.value)}
              className="h-11 w-full rounded-2xl bg-[#F5F5F5] px-3 text-[13px] font-[500] outline-none"
            />
          </Field>
        </div>

        <ImageUploader
          ownerId={ownerId}
          value={form.imageUrl}
          onChange={(url) => updateField("imageUrl", url)}
        />

        {message ? (
          <div className="rounded-2xl bg-orange-50 p-3 text-[13px] font-[700] leading-5 text-brand">
            {message}
          </div>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-neutral-200 bg-white/95 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur">
        <Button className="h-14 w-full text-[16px]" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "쿠폰 등록하기"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-[13px] font-[700] text-[#111111]">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function getInitialDates() {
  const start = new Date();
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  return {
    startAt: toDatetimeLocalValue(start),
    endAt: toDatetimeLocalValue(end),
  };
}

function toDatetimeLocalValue(value: Date) {
  const offset = value.getTimezoneOffset();
  const local = new Date(value.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}
