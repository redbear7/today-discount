import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <label className="flex h-11 items-center gap-3 rounded-2xl bg-[#F5F5F5] px-4 text-neutral-500">
      <Search className="h-5 w-5" strokeWidth={2.2} />
      <input
        type="search"
        placeholder="오늘 할인 검색"
        className="min-w-0 flex-1 bg-transparent text-[16px] font-[400] leading-none text-[#111111] outline-none placeholder:text-neutral-500"
      />
    </label>
  );
}
