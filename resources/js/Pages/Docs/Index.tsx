import React from 'react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Link } from '@inertiajs/react';

export default function DocsIndex() {
  return (
    <MarketingLayout title="Docs">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Developer Documentation</h1>
        <p>Start here for local setup, configuration, theming, and extension guides.</p>
        <ul>
          <li><a href="/docs/PLAN" target="_blank" rel="noreferrer">Project Plan (docs/PLAN.md)</a></li>
          <li><Link href="/billing">Billing flows (app)</Link></li>
          <li><Link href="/projects">CRUD patterns (Projects)</Link></li>
        </ul>
        <h2>API</h2>
        <p>Use Sanctum for SPA auth and personal access tokens. OpenAPI export and Scribe integration can be enabled later.</p>
      </div>
    </MarketingLayout>
  );
}


