create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  store text not null,
  description text,
  discount text not null,
  start_at timestamptz,
  expires_at timestamptz not null,
  image_url text not null,
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.coupons
  add column if not exists description text,
  add column if not exists start_at timestamptz,
  add column if not exists owner_id uuid references auth.users(id) on delete set null;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  nickname text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.coupon_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  coupon_id uuid not null references public.coupons(id) on delete cascade,
  status text not null check (status in ('received', 'used')),
  created_at timestamptz not null default now(),
  unique (user_id, coupon_id)
);

alter table public.coupons enable row level security;
alter table public.users enable row level security;
alter table public.coupon_usage enable row level security;

drop policy if exists "MVP coupons are readable" on public.coupons;
create policy "MVP coupons are readable"
on public.coupons for select
using (true);

drop policy if exists "MVP owners can create coupons" on public.coupons;
create policy "MVP owners can create coupons"
on public.coupons for insert
with check (auth.uid() = owner_id);

drop policy if exists "MVP owners can update own coupons" on public.coupons;
create policy "MVP owners can update own coupons"
on public.coupons for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "MVP users can be created and read" on public.users;
create policy "MVP users can be created and read"
on public.users for all
using (true)
with check (true);

drop policy if exists "MVP coupon usage can be managed" on public.coupon_usage;
create policy "MVP coupon usage can be managed"
on public.coupon_usage for all
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('coupon-images', 'coupon-images', true)
on conflict (id) do update set public = true;

drop policy if exists "MVP coupon images are readable" on storage.objects;
create policy "MVP coupon images are readable"
on storage.objects for select
using (bucket_id = 'coupon-images');

drop policy if exists "MVP owners can upload coupon images" on storage.objects;
create policy "MVP owners can upload coupon images"
on storage.objects for insert
with check (
  bucket_id = 'coupon-images'
  and auth.role() = 'authenticated'
  and storage.foldername(name)[1] = auth.uid()::text
);

drop policy if exists "MVP owners can update coupon images" on storage.objects;
create policy "MVP owners can update coupon images"
on storage.objects for update
using (
  bucket_id = 'coupon-images'
  and auth.role() = 'authenticated'
  and storage.foldername(name)[1] = auth.uid()::text
)
with check (
  bucket_id = 'coupon-images'
  and auth.role() = 'authenticated'
  and storage.foldername(name)[1] = auth.uid()::text
);

insert into public.coupons (title, store, discount, expires_at, image_url)
values
  ('점심특선 30% 할인', '낭만굴비', '30%', now() + interval '3 hours', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=640&q=80'),
  ('치킨 세트 오늘특가', '상남치킨', '40%', now() + interval '6 hours', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=640&q=80'),
  ('아메리카노 1+1', '오늘카페', '1+1', now() + interval '5 hours', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=640&q=80'),
  ('오마카세 런치 35% 할인', '스시오늘 상남', '35%', now() + interval '2 hours', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=640&q=80'),
  ('냉면 한그릇 특가', '명동온면', '25%', now() + interval '8 hours', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=80')
on conflict do nothing;
