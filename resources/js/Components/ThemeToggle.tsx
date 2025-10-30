import React from 'react';
import { useTheme } from '@/Providers/ThemeProvider';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M21.752 15.002A9.718 9.718 0 0112 21.75a9.75 9.75 0 01-8.716-14.338.75.75 0 011.267-.168 7.5 7.5 0 0010.205 10.205.75.75 0 011.265.169.75.75 0 01-.269.822z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3A.75.75 0 012.25 12zm15.72-6.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM12 18.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zM17.16 17.16a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM19.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H20.25A.75.75 0 0119.5 12z" />
        </svg>
      )}
    </button>
  );
}


