import React, { createContext, useState, useEffect, useMemo, useRef } from 'react';
import { Room, Client } from 'colyseus.js';
import { WS_PROTOCOL, HOST_NAME, HOST_PORT } from './../appConfig';
import { IUser } from './../../typescript/interfaces/IUser';
import { AppState } from './../../server/rooms/states/AppState';
import { patchCurrentUser, getCurrentUser } from './../fetches/users';

interface ColyseusContextProps {
  client: React.MutableRefObject<Client | null>;
  appRoom: React.MutableRefObject<Room<AppState> | null>;
  user: React.MutableRefObject<IUser | null>;
}

export const ColyseusContext = createContext<ColyseusContextProps>({
  client: { current: null },
  appRoom: { current: null },
  user: { current: null },
});

interface ColyseusProviderProps {
  children: React.ReactNode;
}

const ColyseusProvider = ({ children }: ColyseusProviderProps) => {
  const client = useRef<Client | null>(null);
  const appRoom = useRef<Room<AppState> | null>(null);
  const user = useRef<IUser | null>(null);

  const connect = async () => {
    const fetchedUser = await getCurrentUser();
    if (fetchedUser) {
      const updatedUser = {
        lastOnline: 'now',
      };
      const patchedUser = await patchCurrentUser(updatedUser);
      user.current = patchedUser;
    } else {
      console.log('no user found');
    }
    const userData = fetchedUser ?? { username: 'guest', userNo: String(Math.floor(Math.random() * 10000)).padStart(4, '0') };
    const newClient = new Client(`${WS_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`);
    try {
      const newAppRoom: Room<AppState> = await newClient.joinOrCreate('app_room', userData);
      client.current = newClient;
      appRoom.current = newAppRoom;
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!client.current && !appRoom.current && !user.current) {
        connect();
      }
    }
    fetchData();

    return () => {
      if (appRoom.current) {
        appRoom.current.leave();
      }
      async function updateLastOnline() {
        // TODO : make it so that it only updates the lastOnline if the user is not already online in the AppRoom
        if (user.current) {
          const updatedUser = {
            lastOnline: new Date(),
          };
          patchCurrentUser(updatedUser);
        }
      }
      updateLastOnline();
    };
  }, []);

  const contextValue = useMemo(() => ({ client, appRoom, user }), [client, appRoom, user]);
  return <ColyseusContext.Provider value={contextValue}>{children}</ColyseusContext.Provider>;
};

export default ColyseusProvider;
