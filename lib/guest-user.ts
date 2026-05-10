"use client";

import { getSupabaseClient } from "@/lib/supabase";

const USER_ID_KEY = "today-discount:user-id";

export async function getOrCreateGuestUserId() {
  const existing = window.localStorage.getItem(USER_ID_KEY);
  if (existing) return existing;

  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const id = crypto.randomUUID();
  const { error } = await supabase
    .from("users")
    .insert({ id, nickname: "동네손님" });

  if (error) {
    throw error;
  }

  window.localStorage.setItem(USER_ID_KEY, id);
  return id;
}

export function getStoredGuestUserId() {
  return window.localStorage.getItem(USER_ID_KEY);
}
