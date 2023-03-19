import { APP_MODE, HOST_URL, HOST_PORT } from '../domain_config';

export const fetchCurrentUser = async () => {
  const avatar = APP_MODE === 'dev' ? './src/client/assets/heroes/chuck/avatar.png' : 'https://picsum.photos/500/600';

  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/current`, {
    credentials: 'include',
  });
  const data = await response.json();

  if (response.ok) {
    data.avatar = avatar;
    return data;
  } else {
    return null;
  }
};
