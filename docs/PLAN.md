## Harrison (getharrison) – SaaS Starter Kit Plan

### Vision, Goals, and Non‑Goals
- **Primary goal**: A configurable, secure, scalable SaaS starter with teams, billing, roles/permissions, dashboard, and a marketing site.
- **Core pillars**: Composability, convention over configuration, clean separation of marketing site vs app, excellent DX.
- **Non-goals**: No multitenancy (single-tenant with team support), no domain-specific assumptions, minimize vendor lock-in.

### Tech Stack and Architecture
- **Backend**: Laravel 12, Jetstream Teams, Fortify, Sanctum, Spatie Permission, Stripe (Cashier), Redis (queues/cache), S3-compatible storage.
- **Frontend**: React + Inertia, Tailwind, shadcn/ui components; tremor for dashboard analytics; Lucide/Heroicons.
- **Data**: SQLite for dev, Postgres for prod.
- **Docs/Tooling**: Scribe (optional), OpenAPI export, Pest, PHPStan/Larastan, Pint, ESLint/Prettier, Husky, Telescope (local), Sentry (optional), GitHub Actions.

### Information Architecture
- **Public site**: Home, features, pricing, FAQ, blog (optional), changelog, terms, privacy, cookie policy, status link, contact.
- **Application shell**: Dashboard with sidebar (light/dark), command palette, notifications center, breadcrumbs, global search.
- **Account/Team**: Profile, security (MFA, sessions), billing (subscription, invoices), team management, roles & invitations.
- **Admin**: Feature flags, user impersonation, app config, audit logs, system health.
- **Developer**: API tokens, webhooks, sandbox mode, Stripe test cards.

### Configurability (First-Class)
- **Branding & theme**: Tailwind tokens + CSS variables; shadcn theme; light/dark; easy logo/favicon swap.
- **Navigation**: JSON-driven menus with feature flags and permission gates.
- **Plans**: Plan matrix in config with features per plan; trials; Stripe price IDs via environment.
- **Access control**: Roles/permissions mapping in config; policy scaffolds and helpers.
- **Legal & Copy**: Markdown-backed terms/privacy; i18n-ready strings and content blocks.

### Milestones and Tasks

#### Milestone 0 — Foundation and Cleanup
- Repo hygiene: `.env.example` with secure defaults; secrets placeholders.
- Verify Laravel 12 + Jetstream React; remove demo content.
- Base configs: Tailwind, PostCSS, `tsconfig`/`jsconfig`, Vite alias `@`.
- Theming: Install shadcn/ui; set tokens (radius/spacing/colors); dark mode via class strategy.

Acceptance: Clean build; dark/light toggle; shadcn components render without errors.

#### Milestone 1 — UI Kit and Application Shell
- Components: Buttons, inputs, selects, dialogs, dropdowns, alerts/toasts, tabs, table, pagination, form primitives, skeletons.
- App shell: Responsive sidebar, topbar with search and user menu, breadcrumbs, command palette (cmdk/kbar).
- Tremor: KPI cards, line/bar/area charts, sparkline, date range filter.
- Accessibility: Keyboard navigation, focus states, ARIA, contrast checks.

Acceptance: Sidebar shell and demo dashboard with tremor KPIs; AA contrast; keyboard flow verified.

#### Milestone 2 — Auth, Security, and Teams
- Auth: Fortify hardened; MFA/TOTP + recovery; email verification; optional passwordless.
- Sessions: Device/session management; sign-out others; optional concurrency limits.
- Teams: Jetstream team CRUD, invitations, team roles, ownership transfer.
- Impersonation: Admin impersonate with banner and audit trail.

Acceptance: End-to-end auth + team flows covered by tests (happy-path and lockouts).

#### Milestone 3 — ACL and Policies
- Spatie Permission: Seed roles/permissions; global roles (owner/admin/member) + team-scoped roles.
- Policies: Policy classes for core models; server enforcement; client helpers to gate UI.
- Feature flags: Toggle non-core features; empty states for insufficient permissions.
- Audit logs: Activity logging for sensitive changes.

Acceptance: Role matrix enforced server and client; denied actions blocked; activity recorded.

#### Milestone 4 — Billing and Plans (Stripe)
- Cashier: Products/prices mapping; trials; tax rates; promotion codes; proration.
- Checkout/Portal: Subscribe/upgrade/downgrade/cancel; proration preview; customer portal link.
- Webhooks: Invoice paid/failed, subscription updated, trial ending; idempotent handlers; retries.
- Plan gating: Middleware-based feature gating and UI cues; invoices list/download; dunning and grace periods.

Acceptance: Full subscription lifecycle validated with Stripe test cards; feature gating enforced.

#### Milestone 5 — Dashboard and Core App Patterns
- Dashboard: Pluggable widget API; saved filters; personalized layout (local storage).
- CRUD patterns: Canonical resource scaffolds (index/show/create/edit) with search/sort/filter/export; server pagination.
- Files: S3 + presigned uploads; previews; attachments pattern.
- Jobs/queues: Redis + Horizon (optional); job status UI; retries/backoff.
- Notifications: In-app + email; bell center; per-notification preferences.

Acceptance: Example resource module demonstrates patterns; drop-in ready for new resources.

#### Milestone 6 — Settings, Profiles, and Admin
- Profile: Avatar, name, email, locale/timezone, connected accounts (Socialite optional).
- Security: MFA management, device list, password update, API tokens (Sanctum).
- Team settings: Team profile, roles, member invites, deletion.
- Admin: Feature flags, users index, impersonation, plan overrides, health checks, logs.

Acceptance: Settings complete; Admin can manage users and system flags.

#### Milestone 7 — Public Site (Marketing)
- Pages: Home, features, pricing (auto from plan config), about, contact, FAQ.
- Legal: Terms, privacy, cookie policy as markdown with versioning and last-updated.
- Blog/changelog: Optional markdown + RSS.
- SEO/Analytics: Meta tags, OG images, sitemap, robots, canonical, cookie consent.

Acceptance: Marketing site under `/`, app under `/app` (or subdomain-ready); pricing synced with config.

#### Milestone 8 — Developer Experience and Docs
- Docs: Getting started, configuration, theming, adding resources, billing, deployment.
- API: Sanctum auth, example endpoints, Scribe-generated docs + OpenAPI.
- Testing: Pest suites for auth/teams/billing; critical browser tests.
- CI/CD: GitHub Actions for lint/test/build; deploy templates; env sync.
- Quality: PHPStan/Larastan baseline, Pint, ESLint/Prettier; Husky pre-commit hooks.

Acceptance: One-command setup; PR checks green; contributor-friendly docs.

#### Milestone 9 — Internationalization and Accessibility
- i18n: Server + client JSON locales; date/number formatting; optional RTL support.
- a11y: axe/lighthouse audits; forms/dialogs/nav accessible; skip links; focus management.

Acceptance: i18n scaffolding in place; core flows pass a11y checks.

#### Milestone 10 — Security, Performance, Reliability
- Security: CSP and secure headers, rate limiting, password policies, webhook verification, strict validation.
- Performance: HTTP caching/ETags, eager loading patterns, cache abstractions, queue offloading, image optimization.
- Reliability: Health checks, backup strategy template, log retention, alerting hooks.

Acceptance: Default security headers and rate limits enabled; perf budgets documented.

### Data Model and Seeds
- Models: `User`, `Team`, `Membership`, `Subscription`, `Role`, `Permission`, `ActivityLog`, `Notification`, `FileAttachment`.
- Seeds: Plans, roles/permissions, feature flags, and optional demo data via `STARTER_SEED=true`.

### Release Checklist
- Branding replaced (logo, colors, name) and theme tokens updated.
- Stripe keys and price IDs configured; webhooks set and verified.
- Legal pages updated and dated; email sender/domain verified.
- Secrets (`APP_KEY`, DB, Redis) set; queues/cron enabled.
- Backups and monitoring connected; smoke tests pass; demo data removed.

### Risks and Mitigations
- Stripe/webhooks complexity → Event-driven, idempotent handlers; local forwarding.
- ACL drift → Centralized permission names with tests covering policies.
- Theming regressions → Snapshot visual tests; constrained token set.
- Scope creep → Non-core behind feature flags; minimal admin first.

### Execution Order Recommendation
Start with Milestone 0 (Foundation), then Milestone 1 (UI Kit + Shell) to lock design tokens and component conventions, followed by Milestones 2–4 (Auth/Teams, ACL, Billing) to secure core flows before expanding features.


