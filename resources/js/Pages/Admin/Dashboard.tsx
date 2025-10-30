import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function AdminDashboard({ counts }: { counts: { users: number } }) {
  return (
    <SidebarLayout title="Admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Users</div>
          <div className="mt-2 text-2xl font-semibold">{counts.users}</div>
        </div>
      </div>
    </SidebarLayout>
  );
}


