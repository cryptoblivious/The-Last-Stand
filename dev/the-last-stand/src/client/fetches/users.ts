import { APP_MODE, HOST_URL, HOST_PORT } from '../appConfig';

// Get the current user from the server through the local cookie
export const getCurrentUser = async () => {
  const avatar = APP_MODE === 'dev' ? './src/client/assets/heroes/chuck/avatar.png' : 'https://picsum.photos/500/600';

  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/current`, {
    credentials: 'include',
  });
  let data = await response.json();

  if (response.ok) {
    data.avatar = avatar;
    return data;
  } else {
    return null;
  }
};

// Get all users from the server
export const getUsers = async () => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users`, {
    credentials: 'include',
  });
  let data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return null;
  }
};

// Patch the current user
export const patchCurrentUser = async (input: any) => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/patchCurrentUser`, {
    method: 'PATCH',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify(input),
  });
  let output = await response.json();

  if (response.ok) {
    return output;
  } else {
    return null;
  }
};
