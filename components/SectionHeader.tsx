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
    <div className="mb-2.5 flex items-end justify-between">
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
        className="h-9 shrink-0 px-1 text-[13px] font-bold text-neutral-500"
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  );
}
