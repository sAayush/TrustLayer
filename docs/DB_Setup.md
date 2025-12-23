# Supabase Development Workflow Guide

This guide outlines the workflows for managing database changes, deployments, and type safety in this project. 
Choose the workflow that matches your environment:
1. **[Standard Workflow (Docker)](#-standard-workflow-recommended)** - Best for robust development with a local database.
2. **[No-Docker Workflow](#%EF%B8%8F-alternative-workflow-no-docker-direct-to-cloud)** - Use this if you cannot run Docker.

---

## ⭐️ Standard Workflow (Recommended)
**Assumption**: You have Docker installed and running.

### 🚀 Phase 1: One-Time Setup
**Perform these steps only once** when setting up the project on a new machine.

#### 1. Authenticate with Supabase
```bash
npx supabase login
```

#### 2. Initialize Project Configuration
```bash
npx supabase init
```

#### 3. Link to Cloud Project
```bash
npx supabase link --project-ref kfowzoyuhmcxasmntxxh
```
*   **Project URL**: [https://supabase.com/dashboard/project/kfowzoyuhmcxasmntxxh](https://supabase.com/dashboard/project/kfowzoyuhmcxasmntxxh)

#### 4. Pull Remote Schema
```bash
npx supabase db pull
```

#### 5. Start Local Database (Docker)
```bash
npx supabase start
```
*   **Why**: Spins up a full local Supabase stack (Postgres, Auth, Storage, Edge Functions, Realtime).

---

### 🔄 Phase 2: The Daily "Code-First" Cycle (Docker)
**Repeated for every feature involving database changes.**

#### Step 1: Create Migration File
```bash
npx supabase migration new add_projects_table
```

#### Step 2: Write SQL
Open the newly created file (e.g., `2025..._add_projects_table.sql`) and write your SQL DDL.
```sql
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null
);

-- 🛡️ SECURITY CRITICAL: Always enable RLS!
alter table public.projects enable row level security;
```

#### Step 3: Apply to Local Database (Testing)
```bash
npx supabase migration up
```
*   **Benefit**: Verifies SQL syntax and policies in your local environment safely.

#### Step 4: Deploy to Production
```bash
npx supabase db push
```
*   **Why**: Applies the new migration(s) to the live remote database.

---

### 📘 Phase 3: TypeScript Integration (Docker)
**Run this after ANY database change.**

```bash
npx supabase gen types typescript --local > src/types/supabase.ts
```

---

### 🛠️ Phase 4: Utility Commands (Docker)

*   `npx supabase status` - Check local API URL/Keys.
*   `npx supabase db reset` - Wipe local DB and re-apply all migrations (fresh start).
*   `npx supabase stop` - Stop local docker containers.

---
---

## ⚠️ Alternative Workflow: No Docker (Direct-to-Cloud)
Use this strategy **ONLY** if you cannot run Docker. In this workflow, you skip the local database and push code directly to the Remote Supabase Cloud.

> [!WARNING]
> **Direct-to-Cloud Risk**: You are modifying the live database directly. If you break the database, you break the live app. Be careful with `DROP TABLE` or destructive changes.

### 🚀 Phase 1: Setup (No Docker)
Run this once to connect your folder to your cloud project.

#### 1. Login
```bash
npx supabase login
```

#### 2. Initialize Folder
```bash
npx supabase init
```
*   Creates `supabase/config.toml`.

#### 3. Link to Remote Project
```bash
npx supabase link --project-ref kfowzoyuhmcxasmntxxh
```
*   Enter your database password when prompted.

---

### � Phase 2: The "No-Docker" Daily Loop

#### Step 1: Create a Migration File
```bash
npx supabase migration new add_feature_name
```

#### Step 2: Write your SQL
Open the new file in `supabase/migrations/` and write your SQL code.

#### Step 3: Push DIRECTLY to Cloud
**Do NOT run `migration up`.**
```bash
npx supabase db push
```
*   **Action**: Reads your local migration files and applies them directly to the remote production database.

#### Step 4: Generate Types from Cloud
Since you have no local DB, generates types from the remote project.
```bash
npx supabase gen types typescript --project-id kfowzoyuhmcxasmntxxh > src/types/supabase.ts
```

---

### Phase 3: What you LOSE (and how to fix it)

| Feature | Docker Workflow (Standard) | No-Docker Workflow | Workaround |
| :--- | :--- | :--- | :--- |
| **Testing** | Tests on Localhost (Safe) | Tests on Live DB (Risky) | Be careful! Or create a 2nd free project (e.g., `trustlayer-dev`) to use as a sandbox. |
| **Data** | Fake local data | Real live data | You are working with real production data. |
| **Edge Functions** | Runs locally | Cannot run locally | You must deploy functions (`npx supabase functions deploy`) to test them. |

### Summary for No-Docker Users

*   **🚫 IGNORE**: `npx supabase start`, `npx supabase stop`, `npx supabase migration up`, `gen types ... --local`
*   **✅ USE ONLY**:
    *   `npx supabase migration new <name>`
    *   `npx supabase db push`
    *   `npx supabase gen types typescript --project-id ...`
