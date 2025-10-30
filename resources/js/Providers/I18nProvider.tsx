import React, { createContext, useContext, useMemo, useState } from 'react';

type Messages = Record<string, string>;

interface I18nContextValue {
  locale: string;
  t: (key: string) => string;
  setLocale: (l: string) => void;
}

const I18N: Record<string, Messages> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.billing': 'Billing',
    'nav.profile': 'Profile',
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>('en');
  const t = (key: string) => I18N[locale]?.[key] ?? key;
  const value = useMemo(() => ({ locale, t, setLocale }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}


