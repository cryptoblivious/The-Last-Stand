import { APP_MODE, HOST_URL, HOST_PORT } from '../domain_config';

// Fetch the current user from the server through the local cookie
export const fetchCurrentUser = async () => {
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

// Fetch all users from the server
export const fetchUsers = async () => {
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

// Patch a user by id
export const patchCurrentUser = async (data: any) => {
  const response = await fetch(`${HOST_URL}:${HOST_PORT}/users/patchCurrentUser`, {
    method: 'PATCH',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify(data),
  });
  let result = await response.json();

  if (response.ok) {
    return result;
  } else {
    return null;
  }
};
