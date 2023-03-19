import { IUser } from '../../typescript/interfaces/IUser';
import { patchCurrentUser } from '../fetches/users';
import { useEffect, useState, useRef } from 'react';

const EditUserInfo = ({ user, className, isSubmitting }: { user: IUser; className: string; isSubmitting: boolean }) => {
  const { avatar, username, title } = user;
  const usernameRef = useRef<HTMLInputElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const titleRef = useRef<HTMLSelectElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A

  const handleSubmit = () => {
    console.log(`Username updated to ${usernameRef.current?.value}`);
    console.log(`Title updated to ${titleRef.current?.value}`);

    // // patch request to update user info
    // const data = async () => {
    //   const updatedUser = {
    //     username: usernameRef.current?.value,
    //     title: titleRef.current?.value,
    //   };

    //   const response = await patchCurrentUser(updatedUser);
    //   console.log(response);
    // };
  };

  useEffect(() => {
    isSubmitting && handleSubmit();
  }, [isSubmitting]);

  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <img
        className='border-purple-900 h-24 w-36 border-2 rounded-full'
        src={avatar}
      />
      <form
        //onSubmit={handleSubmit}
        className='flex flex-col gap-2 justify-center w-80'>
        <input
          className='w-full placeholder-pink-900 placeholder-opacity-50 text-pink-900'
          ref={usernameRef}
          value={username}
          type='text'
          placeholder='Username'
        />
        <select
          id='my-dropdown'
          className='text-pink-900'>
          <option
            value='option1'
            className='text-gray-700 rounded-none'>
            No0bZoR
          </option>
          <option
            value='option2'
            className='text-gray-700'>
            Bounty Hunter
          </option>
          <option
            value='option3'
            className='text-gray-700'>
            Disco King
          </option>
          <option
            value='option4'
            className='text-gray-700'>
            Psycho Fury
          </option>
        </select>
      </form>
    </div>
  );
};

export default EditUserInfo;
