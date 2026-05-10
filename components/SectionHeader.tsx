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
        <h2 className="truncate text-[21px] font-[850] leading-tight tracking-normal text-[#111111]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 truncate text-[15px] font-[560] leading-tight text-neutral-500">
            {subtitle}
          </p>
        ) : null}
      </div>
      <button
        className="h-8 shrink-0 px-1 text-[15px] font-[680] text-neutral-600"
        type="button"
      >
        {actionLabel}
      </button>
    </div>
  );
}
