import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Room, Client } from 'colyseus.js';
import { WS_PROTOCOL, HOST_NAME, HOST_PORT } from './../appConfig';
import { IUser } from './../../typescript/interfaces/IUser';
import { AppState } from './../../server/rooms/states/AppState';
import { patchCurrentUser, getCurrentUser } from './../fetches/users';

interface ColyseusContextProps {
  client: Client | null;
  appRoom: Room<AppState> | null;
}

const ColyseusContext = createContext<ColyseusContextProps>({
  client: null,
  appRoom: null,
});

interface ColyseusProviderProps {
  children: React.ReactNode;
}

const ColyseusProvider = ({ children }: ColyseusProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [appRoom, setAppRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const connect = async () => {
    //const user = await getCurrentUser();
    //setUser(user);
    console.log('connecting...');
    const updatedUser = {
      lastOnline: 'now',
    };

    const patchedUser = await patchCurrentUser(updatedUser);
    setUser(patchedUser);
    const client = new Client(`${WS_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`);
    const room = await client.joinOrCreate('app_room', patchedUser);

    setClient(client);
    setAppRoom(room);
  };

  useEffect(() => {
    async function fetchData() {
      if (!client && !appRoom && !user) {
        console.log('user', user);
        connect();
      }
    }
    fetchData();

    return () => {
      if (appRoom) {
        console.log('users', appRoom.state.users);
        appRoom.leave();
      }
      async function fetchData() {
        if (user) {
          const updatedUser = {
            lastOnline: new Date(),
          };

          patchCurrentUser(updatedUser);
        }
      }
      fetchData();
    };
  }, [client]);

  const contextValue = useMemo(() => ({ client, appRoom: appRoom, user: user }), [client, appRoom]);

  if (!appRoom) {
    {
      return children;
    }
  }

  return <ColyseusContext.Provider value={contextValue}>{children}</ColyseusContext.Provider>;
};

export default ColyseusProvider;
