import React from 'react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function MarketingFeatures() {
  const features = [
    { title: 'Teams', desc: 'Invite members, roles, permissions out of the box.' },
    { title: 'Billing', desc: 'Stripe subscriptions with plans, trials, and portal.' },
    { title: 'Dashboard', desc: 'Sidebar shell, dark mode, and chart-ready widgets.' },
    { title: 'API', desc: 'Sanctum tokens and webhooks for integrations.' },
  ];
  return (
    <MarketingLayout title="Features">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(f => (
          <div key={f.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="text-lg font-semibold">{f.title}</div>
            <div className="mt-2 text-sm text-muted-foreground">{f.desc}</div>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}


