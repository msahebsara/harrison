import React, { useRef, useState } from 'react';

export default function FileUpload({ onUploaded }: { onUploaded?: (file: { id: number; url: string }) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/files', {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content || '' },
        body: form,
      });
      const data = await res.json();
      setUrl(data.url);
      onUploaded?.(data);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" onChange={onChange} className="block w-full text-sm" />
      {uploading ? <div className="text-sm text-muted-foreground">Uploading…</div> : null}
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" className="text-sm underline">View uploaded file</a>
      ) : null}
    </div>
  );
}
