import { SERVER_PORT } from '../../../common/constants';

interface IAuth {
  (): Promise<boolean>;
}

export const isAuth = () => {
  const fetchAuth: IAuth = async () => {
    const response = await fetch(`http://localhost:${SERVER_PORT}/auth/check`, {
      credentials: 'include',
    });
    const data = await response.json();

    if (data.message === 'Authorized') {
      return true;
    } else {
      return false;
    }
  };

  return fetchAuth();
};
