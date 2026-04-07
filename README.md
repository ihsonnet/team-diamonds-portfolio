# Team Diamonds Website

## Local development
```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` if you want survey submissions to be stored while running locally.

## Supabase setup
1. Create a Supabase project.
2. Open the SQL editor and run [supabase/survey_responses.sql](./supabase/survey_responses.sql).
3. Copy `.env.example` to `.env.local`.
4. Fill these values:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_SURVEY_TABLE=survey_responses
```

`SUPABASE_SECRET_KEY` must be a server-only secret key or legacy `service_role` key. Do not use the anon / publishable key.

## Deployed environment
Set the same environment variables in Netlify:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_SURVEY_TABLE`
- `SURVEY_RESPONSES_PASSWORD`

The survey API accepts a local no-op fallback only during development. In production, submissions fail fast if Supabase is not configured so responses are not silently lost.

## Private response viewer
Visit `/survey-responses` to review submissions. The page is protected by the `SURVEY_RESPONSES_PASSWORD` environment variable and reads live data from Supabase on the server.

For programmatic access, use `/api/survey-responses`. It accepts either the same logged-in admin cookie from `/survey-responses`, an `Authorization: Bearer <SURVEY_RESPONSES_PASSWORD>` header, or an `x-survey-admin-password` header.
