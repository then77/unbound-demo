# Standalone Next.js Demo: Unbound OIDC Auth + Profile + Liveblocks Threads

## Summary

Build a standalone demo repo using Next.js 16, shadcn/ui, Better Auth, Neon Postgres, and Liveblocks Comments.

The app demonstrates:

- Unbound OIDC login through Better Auth
- Server-side auth/session handling
- Profile rendering from authenticated OIDC data
- A protected chat page using Liveblocks threads
- User name and picture shown on comments/messages

Pages:

- `/` Home/profile page
- `/chat` Protected chat page

No monorepo assumptions. The app lives at the repository root.

## Corrected OIDC Assumptions

Unbound OIDC discovery:

```txt
https://unbound.rlzy.me/.well-known/openid-configuration
```

OIDC behavior:

- Authorization Code flow
- Public client
- No client secret
- PKCE required/recommended with `S256`
- Scopes: `openid profile email`
- Client id format:

```txt
origin:<origin>
```

Examples:

```txt
origin:http://localhost:3000
origin:https://demo.example.com
```

Development over plain HTTP is allowed. Default local origin:

```txt
http://localhost:3000
```

## Tech Stack

Use:

- Next.js 16 with App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui base components
- Better Auth
- Better Auth generic OAuth/OIDC provider
- Neon Postgres for Better Auth tables
- Liveblocks Comments / Threads

## Project Setup

Create the app:

```bash
pnpm create next-app@latest unbound-demo \
  --ts \
  --app \
  --tailwind \
  --eslint \
  --src-dir false \
  --import-alias "@/*"
cd unbound-demo
```

Install dependencies:

```bash
pnpm add better-auth @neondatabase/serverless drizzle-orm liveblocks @liveblocks/react @liveblocks/react-ui lucide-react class-variance-authority clsx tailwind-merge
pnpm add -D drizzle-kit
```

Initialize shadcn:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card avatar separator skeleton textarea scroll-area
```

## Environment Variables

Create `.env.local.example`:

```env
# App origin
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000

# Better Auth
BETTER_AUTH_SECRET=replace-with-random-secret

# Unbound OIDC
UNBOUND_OIDC_ISSUER=https://unbound.rlzy.me
UNBOUND_OIDC_DISCOVERY_URL=https://unbound.rlzy.me/.well-known/openid-configuration
UNBOUND_OIDC_CLIENT_ID=origin:http://localhost:3000

# Neon Postgres
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# Liveblocks
LIVEBLOCKS_SECRET_KEY=sk_liveblocks_secret
LIVEBLOCKS_ROOM_ID=unbound-demo-chat
```

Generate `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
```

For production, update these together:

```env
NEXT_PUBLIC_APP_ORIGIN=https://your-demo-domain.com
BETTER_AUTH_URL=https://your-demo-domain.com
UNBOUND_OIDC_CLIENT_ID=origin:https://your-demo-domain.com
```

## File Structure

```txt
app/
  api/
    auth/[...all]/route.ts
    liveblocks-auth/route.ts
  chat/
    page.tsx
    chat-client.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  auth-button.tsx
  profile-card.tsx
  site-shell.tsx
  ui/
lib/
  auth.ts
  auth-client.ts
  db.ts
  env.ts
  liveblocks.ts
  redirects.ts
  server-session.ts
drizzle.config.ts
```

## Better Auth Plan

Create `lib/env.ts`:

- Validate required env vars.
- Fail fast if missing.

Create `lib/db.ts`:

- Initialize Neon Postgres connection.
- Export database/client for Better Auth.

Create `lib/auth.ts`:

- Configure Better Auth with:
  - `baseURL: BETTER_AUTH_URL`
  - `secret: BETTER_AUTH_SECRET`
  - Postgres/Drizzle adapter backed by Neon
  - Generic OAuth/OIDC provider id: `unbound`
  - Discovery URL: `UNBOUND_OIDC_DISCOVERY_URL`
  - Client id: `UNBOUND_OIDC_CLIENT_ID`
  - No client secret
  - PKCE S256
  - Scopes: `openid profile email`

The generated authorization request must use:

```txt
response_type=code
client_id=origin:http://localhost:3000
scope=openid profile email
code_challenge_method=S256
```

Create `app/api/auth/[...all]/route.ts`:

```ts
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
```

Create `lib/server-session.ts`:

- Read session only on the server.
- Normalize the user into:

```ts
export type DemoUser = {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
};
```

Fallbacks:

- `name`: user name, then email prefix, then `Unbound User`
- `image`: OIDC `picture` / Better Auth user image
- `id`: Better Auth user id

## Database Plan

Use Better Auth’s schema/migration tooling for its required tables.

Expected tables:

- `user`
- `session`
- `account`
- `verification`

Add `drizzle.config.ts` using `DATABASE_URL`.

Setup commands:

```bash
pnpm exec better-auth generate
pnpm exec drizzle-kit push
```

Keep Better Auth data only in Neon. Do not store Liveblocks messages in Neon.

## Home Page `/`

Server component.

### Logged Out State

Show:

- Welcome/instruction text
- Explanation that the demo signs in with Unbound OIDC
- Login button

If URL contains:

```txt
/?redirect_to=/chat
```

the login flow should preserve `/chat` as the post-login destination.

### Logged In State

Show:

- Avatar
- Name
- Email if available
- User id/sub if useful for demo visibility
- Logout button
- Button/link to `/chat`

## Chat Page `/chat`

Server component wrapper.

### Logged Out State

Redirect server-side:

```ts
redirect("/?redirect_to=/chat");
```

### Logged In State

Render chat UI with authenticated profile data.

The server page should:

- Read Better Auth session server-side
- Normalize profile into `DemoUser`
- Render `ChatClient user={user}`

Do not expose Better Auth session tokens to client components.

## Liveblocks Plan

Create `app/api/liveblocks-auth/route.ts`.

Behavior:

1. Read Better Auth session server-side.
2. If missing, return `401`.
3. Create a Liveblocks session using `LIVEBLOCKS_SECRET_KEY`.
4. Identify user with:
   - `id`
   - `info.name`
   - `info.avatar`
   - `info.email`
5. Grant write access to `LIVEBLOCKS_ROOM_ID`.
6. Return Liveblocks auth response.

For version one:

- Use one shared room: `unbound-demo-chat`
- Do not accept arbitrary room ids from the client
- Every logged-in user can read/write the room

Create `app/chat/chat-client.tsx`:

- Client component
- Uses Liveblocks provider/client auth endpoint `/api/liveblocks-auth`
- Enters `LIVEBLOCKS_ROOM_ID`
- Renders Liveblocks Comments UI:
  - Thread list
  - Composer
  - Loading state
  - Empty state
  - Error/unauthorized state

Each message/thread should display:

- User name
- User picture/avatar
- Message body

## Redirect Safety

Create `lib/redirects.ts`:

```ts
export function getSafeRedirectTo(value: string | null | undefined) {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//")) return "/";
  return value;
}
```

Use this for:

- Login callback destination
- `redirect_to` on home
- Any server action or link that carries a redirect target

## UI Plan

Use shadcn components:

- `Button`
- `Card`
- `Avatar`
- `Separator`
- `Skeleton`
- `Textarea`
- `ScrollArea`

Use `lucide-react` icons:

- `LogIn`
- `LogOut`
- `MessageCircle`
- `UserCircle`

Visual requirements:

- The first screen is the actual demo, not a landing page.
- Keep the layout compact and app-like.
- Home page centers the auth/profile state.
- Chat page uses a full-height app layout with header and scrollable thread area.
- Responsive on mobile and desktop.
- Use avatar initials when no picture exists.

## Error Handling

Handle:

- Missing env vars with clear startup/build errors
- OIDC callback failure by returning to `/` with an error message
- Missing session on `/chat` with server redirect
- Liveblocks auth `401` with “Please sign in again”
- Liveblocks server error with retryable error UI
- Missing name/image with fallbacks

## Acceptance Tests

Manual scenarios:

1. Visit `/` logged out:
   - Shows welcome/instruction state
   - Shows login button
   - Does not show profile

2. Visit `/chat` logged out:
   - Redirects to `/?redirect_to=/chat`

3. Login from home:
   - Starts Unbound OIDC flow
   - Uses `client_id=origin:http://localhost:3000`
   - Uses PKCE S256
   - Does not require or send client secret

4. Complete login:
   - Redirects to `/chat` when started from chat
   - Otherwise redirects to `/`

5. Visit `/` logged in:
   - Shows profile data
   - Shows avatar/name/email when available
   - Shows button to `/chat`

6. Visit `/chat` logged in:
   - Shows Liveblocks thread UI
   - Can create a message/thread
   - Message displays name and picture/avatar

7. Logout:
   - Session clears
   - `/chat` redirects to home again

8. Production config:
   - Changing origin to `https://your-demo-domain.com` and client id to `origin:https://your-demo-domain.com` works without code changes

## Verification Commands

```bash
pnpm lint
pnpm build
```

Optional database verification:

```bash
pnpm exec drizzle-kit push
```

## Explicit Defaults

- Standalone repo, no monorepo setup.
- Local origin: `http://localhost:3000`.
- OIDC provider id: `unbound`.
- OIDC scopes: `openid profile email`.
- Liveblocks room id: `unbound-demo-chat`.
- Better Auth session/database tables live in Neon.
- Liveblocks owns chat/thread storage.
- Auth gating for pages is server-side.
