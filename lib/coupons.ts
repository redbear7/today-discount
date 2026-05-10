export type Coupon = {
  id: string;
  image: string;
  title: string;
  store: string;
  discount: string;
  expiresAt: string;
  distance?: string;
  description: string;
  address: string;
  availableTime: string;
  parking: string;
};

const images = {
  fish: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=640&q=80",
  chicken: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=640&q=80",
  cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=640&q=80",
  sushi: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=640&q=80",
  noodle: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=80",
};

export const coupons: Coupon[] = [
  {
    id: "romantic-gulbi-lunch",
    image: images.fish,
    title: "점심특선 30% 할인",
    store: "낭만굴비",
    discount: "30%",
    expiresAt: "오후 3시까지",
    distance: "상남동 · 280m",
    description: "굴비정식 점심특선을 오늘 오후 3시까지 30% 할인된 가격으로 이용할 수 있어요.",
    address: "경남 창원시 성산구 상남동 12-3",
    availableTime: "오늘 11:30 - 15:00",
    parking: "건물 뒤 공영주차장 1시간 지원",
  },
  {
    id: "sangnam-chicken-set",
    image: images.chicken,
    title: "치킨 세트 오늘특가",
    store: "상남치킨",
    discount: "40%",
    expiresAt: "오후 6시까지",
    distance: "상남동 · 320m",
    description: "대표 치킨 세트 메뉴를 오늘만 특가로 받을 수 있어요. 매장 방문 사용 전용입니다.",
    address: "경남 창원시 성산구 마디미로 24",
    availableTime: "오늘 14:00 - 18:00",
    parking: "주차 불가",
  },
  {
    id: "today-cafe-one-plus-one",
    image: images.cafe,
    title: "아메리카노 1+1",
    store: "오늘카페",
    discount: "1+1",
    expiresAt: "오후 5시까지",
    distance: "상남동 · 510m",
    description: "아메리카노 한 잔 구매 시 한 잔을 무료로 제공합니다. 테이크아웃도 가능해요.",
    address: "경남 창원시 성산구 원이대로 682",
    availableTime: "오늘 12:00 - 17:00",
    parking: "매장 앞 2대 가능",
  },
  {
    id: "sushi-today-lunch",
    image: images.sushi,
    title: "오마카세 런치 35% 할인",
    store: "스시오늘 상남",
    discount: "35%",
    expiresAt: "오늘 오후 2시까지",
    distance: "상남동 · 450m",
    description: "런치 오마카세 좌석이 남아 오늘만 35% 할인됩니다. 쿠폰 수량이 빠르게 소진될 수 있어요.",
    address: "경남 창원시 성산구 상남로 88",
    availableTime: "오늘 11:30 - 14:00",
    parking: "건물 지하주차장 2시간 지원",
  },
  {
    id: "myeongdong-noodle",
    image: images.noodle,
    title: "냉면 한그릇 특가",
    store: "명동온면",
    discount: "25%",
    expiresAt: "오늘 오후 8시까지",
    distance: "중앙동 · 800m",
    description: "물냉면과 비빔냉면 전 메뉴를 오늘 오후 8시까지 할인된 가격으로 제공합니다.",
    address: "경남 창원시 성산구 중앙대로 95",
    availableTime: "오늘 11:00 - 20:00",
    parking: "근처 공영주차장 이용",
  },
];

export const endingSoonCoupons = coupons.slice(0, 3);
export const popularCoupons = coupons.slice(3).concat(coupons[1]);

export function getCoupon(id: string) {
  return coupons.find((coupon) => coupon.id === id);
}
