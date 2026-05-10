import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  caption?: string;
};

export function StatCard({ label, value, caption }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <CardContent className="p-3">
        <p className="text-[12px] font-[500] text-neutral-500">{label}</p>
        <p className="mt-1 truncate text-[22px] font-[780] leading-tight text-[#111111]">
          {value}
        </p>
        {caption ? (
          <p className="mt-1 truncate text-[11px] font-[430] text-neutral-500">
            {caption}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
