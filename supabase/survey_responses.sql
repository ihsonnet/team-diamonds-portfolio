create extension if not exists pgcrypto;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null,
  age text,
  grade text,
  gender text,
  learned_space text,
  interest_level text,
  start_learning text,
  interest_compare text,
  lower_age text,
  lower_reason text,
  pref_learning text,
  played_game text,
  liked_game text,
  game_features text,
  try_diamond text,
  dream_stem text,
  inspire_stem text,
  referer_origin text,
  referer_path text,
  preferred_language text,
  browser_family text,
  os_family text,
  device_type text,
  geo_country text,
  request_id text
);

create index if not exists survey_responses_submitted_at_idx
  on public.survey_responses (submitted_at desc);

alter table public.survey_responses enable row level security;
