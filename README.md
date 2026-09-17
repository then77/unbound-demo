# Unbound OIDC + Liveblocks Demo

A focused Next.js demo that authenticates users through Unbound OIDC, renders
their profile, and grants access to a protected real-time Liveblocks chat room.

> [!NOTE]
> This is a quick demonstration built with AI assistance. It is intended to
> showcase the integration flow, not to serve as a production-ready product.

## What it demonstrates

- OAuth 2.0 Authorization Code flow with PKCE through Unbound OIDC
- Server-side sessions and protected routes with Better Auth
- Profile data returned by the OIDC provider
- Liveblocks room authorization tied to the authenticated user
- Real-time threaded chat and participant resolution
- A restrained dark UI adapted from the Project Unbound visual system

## Stack

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) | App Router, React Server Components, route handlers, and production build |
| [React 19](https://react.dev/) | Component rendering and client interaction |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility styling and design tokens |
| [Better Auth](https://www.better-auth.com/) | Session management and generic OAuth/OIDC integration |
| [Liveblocks](https://liveblocks.io/) | Real-time rooms, threads, and composer UI |
| [Neon](https://neon.tech/) | Serverless PostgreSQL connection |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | Better Auth schema migration tooling |
| [Lucide](https://lucide.dev/) | Interface icons |

## Project structure

```text
app/
├── api/                    # Better Auth and Liveblocks route handlers
├── chat/                   # Protected chat route
├── globals.css             # Global tokens and Liveblocks theme overrides
├── layout.tsx              # Fonts and root metadata
└── page.tsx                # Server-rendered home route
components/
├── layout/                 # Shared site chrome
└── ui/                     # Reusable visual primitives
features/
├── auth/components/        # Authentication and profile presentation
└── chat/components/        # Liveblocks client boundary and chat UI
lib/                        # Server integrations, environment access, and helpers
better-auth_migrations/     # Generated authentication database schema
```

Pages and layouts remain Server Components by default. Interactive auth controls
and the Liveblocks room are isolated Client Components, keeping the browser
bundle focused on code that actually needs hydration. The `/chat` route is also
a separate route-level bundle.

## Prerequisites

- Node.js 20 or newer
- pnpm
- A PostgreSQL database (the demo uses Neon)
- An Unbound OIDC client
- A Liveblocks project and room

## Environment variables

Create `.env.local` in the project root:

```dotenv
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
UNBOUND_OIDC_DISCOVERY_URL=https://your-unbound-host/.well-known/openid-configuration
UNBOUND_OIDC_CLIENT_ID=your-public-client-id
LIVEBLOCKS_SECRET_KEY=sk_dev_replace-me
LIVEBLOCKS_ROOM_ID=unbound-demo-chat
```

`LIVEBLOCKS_ROOM_ID` is optional and defaults to `unbound-demo-chat`. The OIDC
client must allow this callback URL:

```text
http://localhost:3000/api/auth/callback/unbound
```

Use your deployed `BETTER_AUTH_URL` instead of localhost in production.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
pnpm dev                 # Start the development server
pnpm lint                # Run ESLint
pnpm exec tsc --noEmit   # Type-check without emitting files
pnpm build               # Create a production build
pnpm ba:generate         # Generate Better Auth migrations
```

## Security notes

- Secrets are read only on the server and must not use the `NEXT_PUBLIC_` prefix.
- Redirect destinations are restricted to local application paths.
- Liveblocks authorization grants access only to the configured demo room.
- Participant lookup requires an authenticated session and accepts a bounded
  list of user IDs.

For a production application, add rate limiting, structured monitoring, a
content security policy, and integration tests for the full authentication flow.
