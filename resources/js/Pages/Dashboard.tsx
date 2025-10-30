import React from 'react';
import Welcome from '@/Components/Welcome';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function Dashboard() {
  return (
    <SidebarLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'MRR', value: '$0', desc: 'Monthly recurring revenue' },
          { label: 'Active Users', value: '1', desc: 'Users active in last 30d' },
          { label: 'Teams', value: '1', desc: 'Total teams' },
          { label: 'Errors', value: '0', desc: 'Last 24h' },
        ].map(card => (
          <div key={card.label} className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm lg:col-span-2">
          <div className="mb-2 text-sm text-muted-foreground">Active Users (last 30 days)</div>
          <svg viewBox="0 0 400 160" className="h-40 w-full">
            <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,120 40,110 80,100 120,105 160,90 200,95 240,80 280,100 320,70 360,75 400,65" />
          </svg>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 text-sm text-muted-foreground">Storage Used</div>
          <div className="text-2xl font-semibold">1.2 GB</div>
          <div className="mt-2 h-2 w-full rounded bg-muted">
            <div className="h-2 rounded bg-primary" style={{ width: '24%' }} />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
