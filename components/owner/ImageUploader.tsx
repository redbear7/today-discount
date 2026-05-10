"use client";

import { ChangeEvent, useState } from "react";
import { ImagePlus } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";

type ImageUploaderProps = {
  ownerId: string;
  value: string;
  onChange: (url: string) => void;
};

export function ImageUploader({ ownerId, value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Supabase 환경변수를 먼저 설정해주세요.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const extension = file.name.split(".").pop() ?? "jpg";
    const filePath = `${ownerId}/${Date.now()}.${extension}`;
    const { error } = await supabase.storage
      .from("coupon-images")
      .upload(filePath, file, { upsert: true });

    if (error) {
      setMessage("이미지 업로드에 실패했습니다.");
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("coupon-images")
      .getPublicUrl(filePath);

    onChange(data.publicUrl);
    setIsUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-[700] text-[#111111]">쿠폰 이미지</label>
      {value ? (
        <div
          className="h-[132px] rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${value})` }}
        />
      ) : (
        <div className="grid h-[132px] place-items-center rounded-2xl bg-[#F5F5F5] text-neutral-500">
          <div className="flex flex-col items-center gap-2 text-[13px] font-[500]">
            <ImagePlus className="h-7 w-7" strokeWidth={2.2} />
            음식 사진을 올려주세요
          </div>
        </div>
      )}
      <input
        id="coupon-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={uploadImage}
      />
      <label
        htmlFor="coupon-image"
        className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#F5F5F5] text-sm font-[700] text-[#111111]"
      >
        {isUploading ? "업로드 중..." : value ? "이미지 변경" : "이미지 선택"}
      </label>
      {message ? <p className="text-[12px] font-[500] text-brand">{message}</p> : null}
    </div>
  );
}
