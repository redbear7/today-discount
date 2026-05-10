type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel = "더보기",
}: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-end justify-between">
      <div className="min-w-0">
        <h2 className="truncate text-[20px] font-black tracking-[-0.04em] text-[#111111]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 truncate text-[13px] font-semibold text-neutral-500">
            {subtitle}
          </p>
        ) : null}
      </div>
      <button
        className="h-8 shrink-0 rounded-2xl bg-orange-50 px-3 text-[13px] font-black text-brand"
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  );
}
