export type RestaurantIntent =
  | "술자리"
  | "혼밥"
  | "데이트"
  | "가족식사"
  | "회식"
  | "가성비";

export type Restaurant = {
  id: string;
  name: string;
  area: string;
  category: string;
  priceRange: string;
  thumbnail: string;
  tags: RestaurantIntent[];
  strengths: string[];
  recommendedFor: string;
  localScore: number;
  couponLabel?: string;
};

export const changwonRestaurants: Restaurant[] = [
  {
    id: "sangnam-grill",
    name: "상남 숯불갈비",
    area: "상남동",
    category: "고기",
    priceRange: "1인 25,000원대",
    thumbnail: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=640&q=80",
    tags: ["술자리", "회식"],
    strengths: ["3~4인 테이블", "소주 안주", "저녁 모임"],
    recommendedFor: "남자 3명이 고기와 술 한잔하기 좋은 곳",
    localScore: 92,
    couponLabel: "10%",
  },
  {
    id: "sangnam-pocha",
    name: "상남 감성포차",
    area: "상남동",
    category: "포차",
    priceRange: "1인 18,000원대",
    thumbnail: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=640&q=80",
    tags: ["술자리", "가성비"],
    strengths: ["2차 추천", "안주 가성비", "늦은 시간"],
    recommendedFor: "부담 없이 2차까지 이어가기 좋은 술집",
    localScore: 88,
  },
  {
    id: "yongho-sushi",
    name: "용호 스시정",
    area: "용호동",
    category: "일식",
    priceRange: "1인 22,000원대",
    thumbnail: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=640&q=80",
    tags: ["데이트", "가족식사"],
    strengths: ["조용한 분위기", "깔끔한 식사", "예약 추천"],
    recommendedFor: "대화하기 좋은 조용한 식사 자리",
    localScore: 84,
    couponLabel: "15%",
  },
  {
    id: "sangnam-gukbap",
    name: "상남 진국밥",
    area: "상남동",
    category: "국밥",
    priceRange: "8,000원대",
    thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=80",
    tags: ["혼밥", "가성비"],
    strengths: ["빠른 식사", "혼밥 가능", "점심 가성비"],
    recommendedFor: "짧은 점심시간에 든든하게 먹기 좋은 곳",
    localScore: 86,
  },
  {
    id: "jungang-family",
    name: "중앙 한상차림",
    area: "중앙동",
    category: "한식",
    priceRange: "1인 16,000원대",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=640&q=80",
    tags: ["가족식사", "회식"],
    strengths: ["넓은 좌석", "어른 동반", "주차 편함"],
    recommendedFor: "부모님이나 가족과 함께 가기 좋은 한식집",
    localScore: 82,
  },
];

export function recommendRestaurants(query: string) {
  const normalizedQuery = query.toLowerCase();
  const inferredIntents = inferIntents(normalizedQuery);
  const inferredArea = inferArea(normalizedQuery);

  return changwonRestaurants
    .map((restaurant) => {
      let score = restaurant.localScore;

      if (inferredArea && restaurant.area === inferredArea) score += 16;
      inferredIntents.forEach((intent) => {
        if (restaurant.tags.includes(intent)) score += 14;
      });
      if (restaurant.couponLabel) score += 4;

      return { restaurant, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function inferIntents(query: string): RestaurantIntent[] {
  const intents = new Set<RestaurantIntent>();

  if (query.includes("술") || query.includes("한잔") || query.includes("소주") || query.includes("맥주")) {
    intents.add("술자리");
  }
  if (query.includes("혼자") || query.includes("혼밥")) intents.add("혼밥");
  if (query.includes("데이트") || query.includes("여자친구") || query.includes("남자친구")) intents.add("데이트");
  if (query.includes("부모") || query.includes("가족") || query.includes("아이")) intents.add("가족식사");
  if (query.includes("회식") || query.includes("단체")) intents.add("회식");
  if (query.includes("싸") || query.includes("가성비") || query.includes("저렴")) intents.add("가성비");

  if (intents.size === 0) intents.add("가성비");
  return Array.from(intents);
}

export function inferArea(query: string) {
  if (query.includes("상남")) return "상남동";
  if (query.includes("용호")) return "용호동";
  if (query.includes("중앙")) return "중앙동";
  return null;
}
