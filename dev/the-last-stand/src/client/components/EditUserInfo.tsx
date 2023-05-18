import { IUser } from '../../typescript/interfaces/IUser';
import { patchCurrentUser } from '../fetches/fetchUsers';
import { useEffect, useRef, useContext } from 'react';
import { ColyseusContext } from './ColyseusProvider';

const EditUserInfo = ({ user, className, isDoneEditing, inputFunction }: { user: IUser; className?: string; isDoneEditing: boolean; inputFunction: () => void }) => {
  const { avatar, username, title } = user;
  const { appRoom } = useContext(ColyseusContext);
  const usernameRef = useRef<HTMLInputElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const titleRef = useRef<HTMLSelectElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const titleToValueMap = {
    No0bZoR: 'title-1',
    'Bounty Hunter': 'title-2',
    'Disco King': 'title-3',
    'Psycho Fury': 'title-4',
  };

  const checkIfRenamedToIllegalName = () => {
    const illegalNames = ['guest', 'Server'];
    if (illegalNames.includes(usernameRef.current?.value as string)) {
      usernameRef.current!.className = 'w-full placeholder-pink-900 placeholder-opacity-50 bg-red-900 border-pink-600 border-2 rounded-xl p-1 text-red-600';
      usernameRef.current!.value += ` (cannot rename to "${usernameRef.current?.value})`;
    } else {
      usernameRef.current!.className = 'w-full placeholder-green-900 placeholder-opacity-50 bg-green-900 border-green-600 border-2 rounded-xl p-1 text-green-600';
    }
  };

  const handleSubmit = () => {
    if (usernameRef.current?.value !== 'guest' && usernameRef.current?.value !== '') {
      const updatedUser = {
        username: usernameRef.current?.value,
        title: titleRef.current?.selectedOptions[0].textContent,
      };
      patchCurrentUser(updatedUser);
    }
  };

  useEffect(() => {
    isDoneEditing && handleSubmit();
  }, [isDoneEditing, title]);

  if (!title || !appRoom) return <div>Loading...</div>;

  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <img
        className='border-purple-900 h-24 w-24 border-2 rounded-full'
        src={avatar}
      />
      <form className='flex flex-col gap-2 justify-center w-80'>
        <input
          className='w-full placeholder-green-900 placeholder-opacity-50 bg-green-900 border-green-600 border-2 rounded-xl p-1 text-green-600'
          ref={usernameRef}
          type='text'
          defaultValue={username}
          placeholder='Username'
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              inputFunction();
            }
          }}
          onChange={checkIfRenamedToIllegalName}
        />
        <select
          id='my-dropdown'
          ref={titleRef}
          className='border-cyan-500 bg-blue-950 border-2 rounded-xl p-1 text-cyan-300'
          defaultValue={titleToValueMap[title as keyof typeof titleToValueMap]}>
          <option
            value='title-1'
            className='text-pink-600'>
            No0bZoR
          </option>
          <option
            value='title-2'
            className='text-pink-600'>
            Bounty Hunter
          </option>
          <option
            value='title-3'
            className='text-pink-600'>
            Disco King
          </option>
          <option
            value='title-4'
            className='text-pink-600'>
            Psycho Fury
          </option>
        </select>
      </form>
    </div>
  );
};

export default EditUserInfo;
