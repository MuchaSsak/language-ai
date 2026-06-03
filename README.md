# Linkoglot | aplikacja do uczenia się języka

### Tymczasowe repo, commity pushowane za pomocą skryptu żeby nie tracić czasu :)

### - Stack: Expo, Supabase, Tanstack Query, React Native Reusables (Radix UI), NativeWind

### - Przykładowy pattern organizacji PostgreSQL. Nadawanie schemat tabeli i indexów, obsługa funkcji (w tym przypadku nadawanie osiągnięć) za pomocą własnych re-używalnych funkcji utility (np. private.award_achievement_if_missing_tg ('complete-linkoglot-onboarding');), optymalizacja triggerów, zabezpieczenia z RLS

```
begin;

set
  local search_path = public,
  pg_catalog;

/*
Table
*/
create table if not exists public.achievements_pool (
  id uuid primary key default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name jsonb not null,
  description jsonb null,
  type public."ACHIEVEMENT_TYPE" not null unique,
  icon_url text not null,
  xp_gain integer not null,
  rarity public."ACHIEVEMENT_RARITY" not null,
  is_secret bool not null default false,
  constraint achievements_xp_gain_check check ((xp_gain >= 0))
) TABLESPACE pg_default;

/*
Triggers
*/
-- TRANSLATE name
create
or replace trigger achievements_translate_column_name_tr before insert
or
update of name on public.achievements_pool for each row
execute function private.translate_column ('name');

-- TRANSLATE description
create
or replace trigger achievements_translate_column_description_tr before insert
or
update of description on public.achievements_pool for each row
execute function private.translate_column ('description');

-- ACHIEVEMENT play-quiz-first-time
create
or replace trigger achievements_play_quiz_first_time_tr
after insert
or
update of has_finished on public.quizes for each row when (
  (
    NEW.is_challenge = false
    and NEW.has_finished = true
  )
)
execute function private.award_achievement_if_missing_tg ('play-quiz-first-time');

-- ACHIEVEMENT beat-a-challenge
create
or replace trigger achievements_beat_a_challenge_tr
after insert
or
update of has_passed_challenge on public.quizes for each row when (
  (
    NEW.is_challenge = true
    and NEW.has_passed_challenge = true
  )
)
execute function private.award_achievement_if_missing_tg ('beat-a-challenge');

-- ACHIEVEMENT perfect-accuracy
create
or replace trigger achievements_perfect_accuracy_tr
after insert
or
update of accuracy_percentage on public.study_sessions for each row when (
  (
    NEW.type = 'quiz'
    or NEW.type = 'challenge'
  )
  and (NEW.accuracy_percentage = 100)
  and (NEW.game_progress_percentage = 100)
  and (NEW.game_questions_count >= 20)
)
execute function private.award_achievement_if_missing_tg ('perfect-accuracy');

-- ACHIEVEMENT complete-linkoglot-onboarding
create
or replace trigger achievements_complete_linkoglot_onboarding_tr
after insert
or
update of has_finished_onboarding on public.profiles for each row when ((NEW.has_finished_onboarding = true))
execute function private.award_achievement_if_missing_tg ('complete-linkoglot-onboarding');

-- ACHIEVEMENT create-study-sets
create
or replace trigger achievements_create_study_sets_tr
after insert
or
update of total_study_sets on public.profiles for each row when ((NEW.total_study_sets >= 3))
execute function private.award_achievement_if_missing_tg ('create-study-sets');

-- ACHIEVEMENT week-long-day-streak
create
or replace trigger achievements_week_long_day_streak_tr
after insert
or
update of day_streak on public.profiles for each row when (
  (NEW.day_streak >= 7)
  and (NEW.day_streak < 30)
)
execute function private.award_achievement_if_missing_tg ('week-long-day-streak');

-- ACHIEVEMENT month-long-day-streak
create
or replace trigger achievements_month_long_day_streak_tr
after insert
or
update of day_streak on public.profiles for each row when ((NEW.day_streak >= 30))
execute function private.award_achievement_if_missing_tg ('month-long-day-streak');

-- ACHIEVEMENT quiz-speedrunner
create
or replace trigger achievements_quiz_speedrunner_tr
after insert
or
update of has_finished_game on public.study_sessions for each row when (
  -- Average less than 1s on question
  (
    (NEW.type = 'quiz')
    or (NEW.type = 'challenge')
  )
  and (NEW.has_finished_game = true)
  and (NEW.game_questions_count >= 10)
  and (
    NEW.time_spent_seconds <= (NEW.game_questions_count * 2)
  )
)
execute function private.award_achievement_if_missing_tg ('quiz-speedrunner');

-- ACHIEVEMENT night-owl
create
or replace trigger achievements_night_owl_tr
after insert
or
update of has_finished_game on public.study_sessions for each row when ((NEW.has_finished_game = true))
execute function private.achievement_night_owl ();

-- ACHIEVEMENT early-bird
create
or replace trigger achievements_early_bird_tr
after insert
or
update of has_finished_game on public.study_sessions for each row when ((NEW.has_finished_game = true))
execute function private.achievement_early_bird ();

/*
RLS
*/
alter table public.achievements_pool ENABLE row LEVEL SECURITY;

-- Disable CRUD for all
drop policy if exists "Disable CRUD for all" on public.achievements_pool;

create policy "Disable CRUD for all" on public.achievements_pool for all to authenticated using (false);

commit;
```
