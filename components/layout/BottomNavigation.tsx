"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Home, Ticket, UserRound } from "lucide-react";

const items = [
  { href: "/pwa/home", label: "홈", icon: Home },
  { href: "/popular", label: "인기", icon: Flame },
  { href: "/my-coupons", label: "내쿠폰", icon: Ticket },
  { href: "/my", label: "마이", icon: UserRound },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto h-16 max-w-[430px] border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="grid h-full grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (label === "홈" && pathname === "/") || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold"
              style={{ color: active ? "#FF6B00" : "#737373" }}
            >
              <Icon className="h-6 w-6" strokeWidth={active ? 2.8 : 2.4} fill={active && (label === "홈" || label === "인기") ? "currentColor" : "none"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
