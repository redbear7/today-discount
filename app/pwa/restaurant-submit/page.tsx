"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase";

const tags = ["술자리", "혼밥", "데이트", "가족식사", "회식", "가성비"];

export default function RestaurantSubmitPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["가성비"]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const area = String(formData.get("area") ?? "").trim();
    const reason = String(formData.get("reason") ?? "").trim();

    if (!name || !area || !reason) {
      setMessage("매장명, 동네, 추천 이유를 입력해주세요.");
      return;
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("restaurant_submissions").insert({
        name,
        area,
        reason,
        tags: selectedTags,
      });

      if (error) {
        setMessage("제보 저장에 실패했습니다. Supabase 스키마를 확인해주세요.");
        return;
      }
    }

    setSubmitted(true);
  }

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-6 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center gap-3">
          <Link href="/pwa/ai-food" className="grid h-10 w-10 place-items-center rounded-full" aria-label="뒤로가기">
            <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
          </Link>
          <div>
            <h1 className="text-[20px] font-[780] leading-tight">맛집 제보</h1>
            <p className="text-[12px] font-[430] text-neutral-500">짧게 눌러서 로컬 데이터를 모아요</p>
          </div>
        </div>
      </header>

      {submitted ? (
        <section className="px-4 pt-4">
          <div className="rounded-2xl bg-orange-50 p-5 text-center">
            <CheckCircle2 className="mx-auto h-9 w-9 text-brand" />
            <h2 className="mt-3 text-[20px] font-[780]">제보가 접수됐어요</h2>
            <p className="mt-2 text-[14px] font-[430] leading-6 text-neutral-600">
              다음 단계에서는 Supabase에 저장하고 운영자 검수 화면으로 연결합니다.
            </p>
            <Link
              href="/pwa/ai-food"
              className="mt-4 flex h-12 items-center justify-center rounded-2xl bg-brand text-[15px] font-[700] text-white"
            >
              추천으로 돌아가기
            </Link>
          </div>
        </section>
      ) : (
        <form onSubmit={submit} className="space-y-3 px-4 pt-3">
          <Field label="매장명">
            <input
              name="name"
              required
              placeholder="예: 상남 숯불갈비"
              className="h-12 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
            />
          </Field>

          <Field label="동네">
            <input
              name="area"
              required
              placeholder="예: 상남동"
              className="h-12 w-full rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[500] outline-none placeholder:text-neutral-500"
            />
          </Field>

          <Field label="한줄 추천 이유">
            <textarea
              name="reason"
              required
              rows={3}
              placeholder="예: 남자 3명이 술 마시기 좋고 안주 양이 많아요"
              className="w-full resize-none rounded-2xl bg-[#F5F5F5] px-4 py-3 text-[15px] font-[430] leading-5 outline-none placeholder:text-neutral-500"
            />
          </Field>

          <div>
            <p className="mb-2 text-[13px] font-[700]">어떤 상황에 좋아요?</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={
                      active
                        ? "h-10 rounded-full bg-brand px-3 text-[14px] font-[700] text-white"
                        : "h-10 rounded-full bg-[#F5F5F5] px-3 text-[14px] font-[500] text-neutral-600"
                    }
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {message ? (
            <div className="rounded-2xl bg-orange-50 p-3 text-[13px] font-[700] text-brand">
              {message}
            </div>
          ) : null}

          <Button className="h-14 w-full text-[16px]">
            맛집 제보하기
          </Button>
        </form>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[13px] font-[700] text-[#111111]">{label}</span>
      {children}
    </label>
  );
}
