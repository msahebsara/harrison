import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';

export default function AdminUsers({ users }: { users: { data: any[] } }) {
  return (
    <SidebarLayout title="Users">
      <div className="overflow-hidden rounded-md border">
        <table className="min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.data.map((u: any) => (
              <tr key={u.id}>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 text-sm text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}


