import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchLogout = () => {
  const formData = new FormData();

  fetch(`${HOST_URL}:${HOST_PORT}/auth/logout`, {
    method: 'DELETE',
    body: formData,
    credentials: 'include',
  });
  // .then((res) => res.json())
  // .then((res) => {
  //   console.log('Logged out', res);
  //   return true;
  // });
};
