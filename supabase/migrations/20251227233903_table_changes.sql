alter table "public"."talent_profiles" 
add column "other_skills" text[] default array[]::text[],
add column "is_vetted" boolean default false,
add column "is_fresher" boolean default false;

alter table "public"."profile_skills" rename to "talent_skills";
