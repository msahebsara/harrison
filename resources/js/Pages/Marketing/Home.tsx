import React from 'react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

export default function MarketingHome() {
  const route = useRoute();
  return (
    <MarketingLayout title="Home">
      <section className="grid gap-6 py-10 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          A modern SaaS starter kit with teams, billing, and great DX.
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Harrison gets you from idea to production with batteries included and flexible components.
        </p>
        <div className="flex justify-center gap-3">
          <Link href={route('register')}>
            <Button>Get started</Button>
          </Link>
          <Link href={route('marketing.pricing')}>
            <Button variant="outline">See pricing</Button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}


