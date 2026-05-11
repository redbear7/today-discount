"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Bot, Send, UsersRound } from "lucide-react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";
import { inferArea, inferIntents, recommendRestaurants } from "@/lib/restaurants";
import { getSupabaseClient } from "@/lib/supabase";

const quickPrompts = [
  "오늘 남자 3명이서 상남동에서 술한잔",
  "상남동 혼밥 가성비 좋은 곳",
  "부모님 모시고 조용한 한식",
];

export default function AiFoodPage() {
  const [query, setQuery] = useState("오늘 남자 3명이서 상남동에서 술한잔");
  const [submittedQuery, setSubmittedQuery] = useState(query);

  const recommendations = useMemo(() => recommendRestaurants(submittedQuery), [submittedQuery]);
  const intents = inferIntents(submittedQuery);
  const area = inferArea(submittedQuery) ?? "창원";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    void submitQuery(query.trim());
  }

  async function submitQuery(nextQuery: string) {
    setSubmittedQuery(nextQuery);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const nextRecommendations = recommendRestaurants(nextQuery);
    await supabase.from("recommendation_logs").insert({
      user_query: nextQuery,
      extracted_area: inferArea(nextQuery),
      extracted_intents: inferIntents(nextQuery),
      recommended_restaurant_ids: nextRecommendations.map(({ restaurant }) => restaurant.id),
    });
  }

  return (
    <main className="mx-auto h-[100dvh] max-w-[430px] overflow-y-auto bg-white pb-20 text-[#111111] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-12 items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[780] leading-tight">창원 뭐먹지</h1>
            <p className="text-[12px] font-[430] text-neutral-500">상황을 말하면 로컬 맛집 추천</p>
          </div>
          <Link
            href="/pwa/restaurant-submit"
            className="rounded-full bg-orange-50 px-3 py-1.5 text-[13px] font-[700] text-brand"
          >
            제보
          </Link>
        </div>
      </header>

      <section className="px-4 pt-3">
        <div className="rounded-2xl bg-[#F5F5F5] p-3">
          <div className="flex gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Bot className="h-5 w-5" />
            </div>
            <p className="text-[15px] font-[500] leading-6 text-[#111111]">
              {area}에서 <span className="font-[760] text-brand">{intents.join(" · ")}</span>에 맞는 곳을 골랐어요.
              쿠폰과 로컬 제보가 쌓일수록 더 정확해집니다.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pt-3">
        <form onSubmit={submit} className="flex gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 상남동에서 3명이 술한잔"
            className="h-12 min-w-0 flex-1 rounded-2xl bg-[#F5F5F5] px-4 text-[15px] font-[430] outline-none placeholder:text-neutral-500"
          />
          <Button className="h-12 w-12 shrink-0 rounded-2xl p-0" aria-label="추천 받기">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </section>

      <section className="flex gap-2 overflow-x-auto px-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => {
              setQuery(prompt);
              void submitQuery(prompt);
            }}
            className="h-9 shrink-0 rounded-full bg-orange-50 px-3 text-[13px] font-[600] text-brand"
          >
            {prompt}
          </button>
        ))}
      </section>

      <section className="px-4 pt-4">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 className="text-[20px] font-[780] leading-tight">추천 맛집</h2>
            <p className="mt-1 text-[14px] font-[430] text-neutral-500">질문: {submittedQuery}</p>
          </div>
          <UsersRound className="h-5 w-5 text-neutral-500" />
        </div>
        <div className="space-y-2.5">
          {recommendations.map(({ restaurant, score }, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              score={score}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      <section className="px-4 pt-4">
        <Link
          href="/pwa/restaurant-submit"
          className="flex h-12 items-center justify-center rounded-2xl border border-brand bg-white text-[15px] font-[700] text-brand"
        >
          창원 찐맛집 제보하기
        </Link>
      </section>

      <BottomNavigation />
    </main>
  );
}
