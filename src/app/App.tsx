import type { JSX } from 'react';
import { BrowserRouter } from 'react-router';

import { I18nProvider } from '@/i18n';

import { AppRoutes } from './AppRoutes';

export function App(): JSX.Element {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </I18nProvider>
  );
}
