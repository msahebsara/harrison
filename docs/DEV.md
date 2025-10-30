## Harrison Developer Guide

### Setup
1. Copy `.env.example` to `.env` and set `APP_KEY` with `php artisan key:generate`.
2. Ensure a database is configured (SQLite by default at `database/database.sqlite`).
3. Migrate and seed: `php artisan migrate --seed`.
4. Stripe: set `STRIPE_KEY`, `STRIPE_SECRET`, and optionally `STRIPE_PRICING_TABLE_ID`.
5. Queues: run `php artisan queue:work` for notifications/jobs.

### Running
- Laravel: `php artisan serve` (or your preferred local server)
- Frontend: `npm run dev` (already running in your terminal per project setup)

### Billing
- Pricing page uses Stripe Pricing Table embed. Set `STRIPE_PRICING_TABLE_ID`.
- App header has a "Billing portal" button that posts to Cashier billing portal.
- Webhooks: forward Stripe events to `/stripe/webhook`.

### Notifications
- Database notifications are surfaced via the bell in the app header.
- Mark all as read in the dropdown.

### Files & Media
- Upload component posts to `/files` and stores on `public` disk.
- Swap to S3 by setting `FILESYSTEM_DISK=s3` and updating the controller to store on `s3`.

### Admin
- Admin (owner/admin) at `/admin` with users and feature flags.
- Toggle flags at `/admin/flags`.

### Theming & i18n
- Dark mode via `ThemeProvider`; tokens in `resources/css/app.css`.
- I18n scaffold via `I18nProvider` with `en` defaults.

### Tests & CI (suggested)
- Use Pest for feature/unit tests.
- Add GitHub Actions: run `composer test`, `npm ci && npm run build`.

### Common Commands
- Migrate: `php artisan migrate` / `migrate:fresh --seed`
- Cache clear: `php artisan optimize:clear`
- Lint: `composer pint` and `npm run lint`
