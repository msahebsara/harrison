import React from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function FeatureFlags({ flags }: { flags: { id: number; key: string; enabled: boolean }[] }) {
  const { data, setData, post, processing, errors } = useForm({ key: '' });
  return (
    <SidebarLayout title="Feature Flags">
      <form
        onSubmit={e => {
          e.preventDefault();
          post(route('admin.flags.store'));
        }}
        className="mb-4 flex gap-2"
      >
        <Input placeholder="feature.key" value={data.key} onChange={e => setData('key', e.target.value)} />
        <Button type="submit" disabled={processing}>Add</Button>
      </form>
      <div className="overflow-hidden rounded-md border">
        <table className="min-w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Key</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Enabled</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {flags.map(f => (
              <tr key={f.id}>
                <td className="px-4 py-2">{f.key}</td>
                <td className="px-4 py-2 text-sm">{f.enabled ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-right">
                  <form method="post" action={route('admin.flags.toggle', f.id)}>
                    <input type="hidden" name="_token" value={(document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content} />
                    <Button type="submit" variant={f.enabled ? 'secondary' : 'default'} size="sm">
                      {f.enabled ? 'Disable' : 'Enable'}
                    </Button>
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


