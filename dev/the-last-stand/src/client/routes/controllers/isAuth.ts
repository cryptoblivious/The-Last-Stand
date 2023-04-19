import { HOST_URL, HOST_PORT } from '../../appConfig';

interface IAuth {
  (): Promise<boolean | any>;
}

export const isAuth = () => {
  const fetchAuth: IAuth = async () => {
    try {
      const response = await fetch(`${HOST_URL}:${HOST_PORT}/auth/check`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.message === 'Authorized') {
        return { status: true, data: { message: 'Authenticated' } };
      } else {
        return { status: false, data: { message: 'Not Authenticated' } };
      }
    } catch (error) {
      return { status: false, data: { error: 'Server Error' } };
    }
  };

  return fetchAuth();
};
