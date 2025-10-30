import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

interface NotificationItem {
  id: string;
  data: any;
  created_at: string;
}

export default function NotificationsMenu() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    const res = await fetch('/notifications', { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      setItems((data.data ?? data) as NotificationItem[]);
    }
  };

  useEffect(() => {
    if (open) fetchItems();
  }, [open]);

  const markAllRead = async () => {
    await fetch('/notifications/read-all', { method: 'POST', headers: { 'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '' } });
    fetchItems();
  };

  const count = items.length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="relative rounded-md p-2 hover:bg-accent" aria-label="Notifications">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        {count > 0 ? <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-destructive px-1 text-[10px] text-destructive-foreground">{count}</span> : null}
      </button>
      {open ? (
        <div className="absolute right-0 z-40 mt-2 w-80 rounded-md border border-border bg-card p-2 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium">Notifications</div>
            <button className="text-xs underline" onClick={markAllRead}>Mark all read</button>
          </div>
          <div className="max-h-80 overflow-auto">
            {items.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">No new notifications.</div>
            ) : (
              items.map(n => (
                <div key={n.id} className="rounded-md p-3 hover:bg-muted/50">
                  <div className="text-sm">{n.data?.message ?? 'Notification'}</div>
                  <div className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
