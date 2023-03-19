import { ReactElement } from 'react';

export interface IProtectedRouteProps {
  element: ReactElement;
  userAuth?: boolean | 'both';
  redirects?: string;
}
