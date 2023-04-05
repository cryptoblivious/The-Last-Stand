import { IUser } from '../../typescript/interfaces/IUser';
import { patchCurrentUser } from '../fetches/users';
import { useEffect, useRef } from 'react';

const EditUserInfo = ({ user, className, isDoneEditing }: { user: IUser; className?: string; isDoneEditing: boolean }) => {
  const { avatar, username, title } = user;
  const usernameRef = useRef<HTMLInputElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const titleRef = useRef<HTMLSelectElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A

  const handleSubmit = () => {
    console.log(`Username updated to ${usernameRef.current?.value}`);
    console.log(`Title updated to ${titleRef.current?.selectedOptions[0].textContent}`);

    // TODO: SEND PATCH REQUEST TO UPDATE USER INFO
    // // patch request to update user info
    const updatedUser = {
      username: usernameRef.current?.value,
      title: titleRef.current?.selectedOptions[0].textContent,
    };

    patchCurrentUser(updatedUser);
  };

  useEffect(() => {
    isDoneEditing && handleSubmit();
  }, [isDoneEditing]);

  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <img
        className='border-purple-900 h-24 w-24 border-2 rounded-full'
        src={avatar}
      />
      <form
        //onSubmit={handleSubmit}
        className='flex flex-col gap-2 justify-center w-80'>
        <input
          className='w-full placeholder-pink-900 placeholder-opacity-50 bg-purple-900 border-pink-600 border-2 rounded-xl p-1 text-pink-600'
          ref={usernameRef}
          type='text'
          defaultValue={username}
          placeholder='Username'
        />
        <select
          id='my-dropdown'
          ref={titleRef}
          className=' bg-purple-900 border-pink-600 border-2 rounded-xl p-1 text-pink-600'>
          <option
            value='option1'
            className='text-pink-600'>
            No0bZoR
          </option>
          <option
            value='option2'
            className='text-pink-600'>
            Bounty Hunter
          </option>
          <option
            value='option3'
            className='text-pink-600'>
            Disco King
          </option>
          <option
            value='option4'
            className='text-pink-600'>
            Psycho Fury
          </option>
        </select>
      </form>
    </div>
  );
};

export default EditUserInfo;
