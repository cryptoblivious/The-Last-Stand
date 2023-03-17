import { HOST_URL, HOST_PORT } from '../../config';

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
        return { status: true, data: { message: 'Authorized' } };
      } else {
        return { status: false, data: { message: 'Unauthorized' } };
      }
    } catch (error) {
      console.log(error);
      return { status: false, data: { message: 'Server error' } };
    }
  };

  return fetchAuth();
};
