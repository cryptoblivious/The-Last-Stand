import { SERVER_PORT } from '../../../common/constants';

interface IAuth {
  (): Promise<boolean | any>;
}

export const isAuth = () => {
  const fetchAuth: IAuth = async () => {
    try {
      const response = await fetch(`http://localhost:${SERVER_PORT}/auth/check`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.message === 'Authorized') {
        return { status: true, data };
      } else {
        return { status: false, data };
      }
    } catch (error) {
      console.log(error);
      return { status: false, data: { message: 'Server error' } };
    }
  };

  return fetchAuth();
};
