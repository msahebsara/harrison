import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { useForm } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function ProjectsEdit({ project }: { project: { id: number; name: string; description?: string } }) {
  const { data, setData, put, processing, errors } = useForm({ name: project.name, description: project.description ?? '' });
  return (
    <SidebarLayout title="Edit Project">
      <form
        onSubmit={e => {
          e.preventDefault();
          put(route('projects.update', project.id));
        }}
        className="max-w-xl space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm">Name</label>
          <Input value={data.name} onChange={e => setData('name', e.target.value)} />
          {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
          />
          {errors.description ? <p className="mt-1 text-sm text-red-600">{errors.description}</p> : null}
        </div>
        <Button type="submit" disabled={processing}>Save</Button>
      </form>
    </SidebarLayout>
  );
}


