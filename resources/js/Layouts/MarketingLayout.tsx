import React, { PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import ThemeToggle from '@/Components/ThemeToggle';

export default function MarketingLayout({ title, children }: PropsWithChildren<{ title: string }>) {
  const route = useRoute();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head title={title} />
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="container-app flex h-14 items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <Link href={route('marketing.home')} className="font-semibold">Harrison</Link>
            <Link href={route('marketing.features')}>Features</Link>
            <Link href={route('marketing.pricing')}>Pricing</Link>
            <Link href={route('login')} className="ml-2">Sign in</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main className="container-app py-10">{children}</main>
      <footer className="mt-12 border-t border-border">
        <div className="container-app flex h-14 items-center justify-between text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Harrison</div>
          <div className="space-x-4">
            <Link href={route('terms.show')}>Terms</Link>
            <Link href={route('policy.show')}>Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


