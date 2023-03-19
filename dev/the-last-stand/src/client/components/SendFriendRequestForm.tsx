import { useEffect, useRef, useState } from 'react';
import Button from './Button';

const SendFriendRequestForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const [userNo, setUserNo] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`Request sent to ${usernameRef.current?.value}${userNo}`);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    console.log(value);

    setUserNo(value === '#' ? '' : value.length === 1 ? '#' + value : value.length === 6 ? userNo : value); //ref:ChatGPT
  };

  useEffect(() => {
    usernameRef.current?.focus(); //ref:https://blog.logrocket.com/usestate-vs-useref/
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2'>
      <h4 className='text-pink-900'>Friend Request</h4>
      <p className='text-sm'>Enter the username and number of the player you want to invite.</p>
      <div>
        <input
          ref={usernameRef}
          type='text'
          placeholder='Username'
          className='w-1/2 placeholder-pink-900 placeholder-opacity-50 text-pink-900'
        />
        <input
          type='text'
          value={userNo}
          placeholder='#0000'
          onChange={handleChange}
          className='w-1/2 placeholder-pink-900 placeholder-opacity-50 text-pink-900'
        />
      </div>
      <p className='text-xs'>(psst! It's cAsE sEnSiTiVe!)</p>
      <Button text='Send friend request' />
    </form>
  );
};

export default SendFriendRequestForm;
