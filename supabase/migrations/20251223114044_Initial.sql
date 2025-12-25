-- 1. Create a function to auto-update 'updated_at' columns
-- This saves you from manually updating timestamps in your code
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2. THE PROFILES TABLE (Base User)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text check (role in ('talent', 'organization')) default 'talent',
  full_name text, -- Nullable since you don't ask for it at signup yet
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to update 'updated_at' automatically
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 3. THE SKILLS DICTIONARY (Global List)
-- e.g. { id: 1, name: 'React', slug: 'react' }
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null unique, -- 'Node.js'
  slug text not null unique, -- 'node-js' (for URLs/Search)
  created_at timestamptz default now()
);

-- 4. TALENT INFO (Specific to Developers)
create table public.talent_profiles (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  resume_url text,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  leetcode_url text,
  other_links jsonb default '{}'::jsonb, -- Store random links here
  current_company text,
  total_experience_years numeric(4,1) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger on_talent_updated
  before update on public.talent_profiles
  for each row execute procedure public.handle_updated_at();

-- 5. USER SKILLS (The Link Table)
-- Connects a Talent Profile to a Skill
create table public.profile_skills (
  profile_id uuid references public.profiles(id) on delete cascade not null,
  skill_id uuid references public.skills(id) on delete cascade not null,
  primary key (profile_id, skill_id) -- Prevents duplicate skills for same user
);

-- 6. SECURITY (Row Level Security)
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.talent_profiles enable row level security;
alter table public.profile_skills enable row level security;

-- Policies
-- Profiles: readable by all, editable by owner
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Talent Info: readable by all, editable by owner
create policy "Talent info viewable by everyone." on talent_profiles for select using (true);
create policy "Users can update own talent info." on talent_profiles for update using (auth.uid() = id);
create policy "Users can insert own talent info." on talent_profiles for insert with check (auth.uid() = id);

-- Skills: readable by all, only admins/system insert (usually)
create policy "Skills viewable by everyone." on skills for select using (true);
-- You might want to allow users to insert new skills if they don't exist?
-- If so, uncomment this:
-- create policy "Authenticated users can create skills." on skills for insert with check (auth.role() = 'authenticated');

-- User Skills: viewable by all, editable by owner
create policy "User skills viewable by everyone." on profile_skills for select using (true);
create policy "Users can manage own skills." on profile_skills for all using (auth.uid() = profile_id);

-- 7. THE TRIGGER (Updated for your needs)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    -- Default to 'talent' if no role is sent, otherwise use metadata
    coalesce(new.raw_user_meta_data->>'role', 'talent')
  );
  
  -- Optional: Automatically create the empty talent_profile row too?
  -- if (new.raw_user_meta_data->>'role' = 'talent') then
  --   insert into public.talent_profiles (id) values (new.id);
  -- end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Attach the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();