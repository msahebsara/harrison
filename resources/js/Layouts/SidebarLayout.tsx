import React, { PropsWithChildren, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import ThemeToggle from '@/Components/ThemeToggle';
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import NotificationsMenu from '@/Components/NotificationsMenu';

interface Props {
  title: string;
}

export default function SidebarLayout({ title, children }: PropsWithChildren<Props>) {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const { props } = usePage<{ app?: { impersonating?: boolean } }>();

  const nav = [
    { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
    { name: 'Projects', href: route('projects.index'), active: route().current('projects.*') },
    // Billing will post to portal from header actions instead of a page
    { name: 'Profile', href: route('profile.show'), active: route().current('profile.show') },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:inset-x-0 focus:top-2 z-50 mx-auto w-max rounded bg-primary px-3 py-1.5 text-primary-foreground">Skip to content</a>
      <Head title={title} />
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 z-30 w-64 transform border-r border-border bg-card p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <Link href={route('dashboard')} className="font-semibold">
              Harrison
            </Link>
            <button
              className="lg:hidden rounded-md p-2 hover:bg-accent"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-1">
            {nav.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                  item.active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {props.app?.permissions && (props.app.permissions as string[]).length > 0 ? (
              <>
                <div className="mt-4 border-t pt-4 text-xs text-muted-foreground">Admin</div>
                <Link
                  href={route('admin.dashboard')}
                  className={`mt-1 block rounded-md px-3 py-2 text-sm transition-colors ${
                    route().current('admin.*') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  Admin
                </Link>
              </>
            ) : null}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
            <div className="container-app flex h-14 items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(p => !p)}
                  className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
                  aria-label="Open sidebar"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <span className="font-medium">{title}</span>
              </div>
              <div className="flex items-center gap-2">
                <NotificationsMenu />
                <ThemeToggle />
                <form method="post" action={route('billing.portal')}>
                  <input type="hidden" name="_token" value={(document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content} />
                  <button type="submit" className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm hover:bg-accent">Billing portal</button>
                </form>
              </div>
            </div>
            {props.app?.impersonating ? (
              <div className="bg-destructive text-destructive-foreground">
                <div className="container-app flex items-center justify-between py-1 text-sm">
                  <span>You are impersonating another user.</span>
                  <form method="post" action={route('impersonate.stop')}>
                    <input type="hidden" name="_token" value={(document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content} />
                    <button type="submit" className="underline">Stop impersonating</button>
                  </form>
                </div>
              </div>
            ) : null}
          </header>
          <main id="main" className="container-app py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}


