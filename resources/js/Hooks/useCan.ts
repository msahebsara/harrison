import { usePage } from '@inertiajs/react';

export default function useCan() {
  const { props } = usePage<{ app?: { permissions?: string[] } }>();
  const set = new Set(props.app?.permissions ?? []);
  return (permission: string) => set.has(permission);
}


