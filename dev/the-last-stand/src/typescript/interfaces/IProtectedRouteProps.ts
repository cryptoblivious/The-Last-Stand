import { ReactElement } from 'react';

export interface IProtectedRouteProps {
  element: ReactElement;
  userAuth?: boolean;
  redirects?: string;
}
