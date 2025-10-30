import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function ProjectsIndex({ projects }: { projects: { data: any[]; links: any[] } }) {
  const { props } = usePage();
  return (
    <SidebarLayout title="Projects">
      <div className="mb-4 flex justify-end">
        <Link href={route('projects.create')}>
          <Button>Create Project</Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-md border">
        <table className="min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Updated</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.data.map((p: any) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-sm text-muted-foreground">{new Date(p.updated_at).toLocaleString()}</td>
                <td className="px-4 py-2 text-right">
                  <Link href={route('projects.edit', p.id)} className="text-sm underline">
                    Edit
                  </Link>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      router.delete(route('projects.destroy', p.id));
                    }}
                    className="ml-3 inline"
                  >
                    <Button variant="destructive" size="sm">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}


