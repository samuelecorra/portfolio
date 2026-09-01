import type { JSX } from 'react';
import { BrowserRouter } from 'react-router';

import { AppRoutes } from './AppRoutes';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
