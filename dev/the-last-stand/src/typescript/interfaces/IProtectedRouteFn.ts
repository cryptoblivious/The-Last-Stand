import { IProtectedRouteProps } from './IProtectedRouteProps';

export interface IProtectedRouteFn {
  (props: IProtectedRouteProps): React.ReactNode;
}
