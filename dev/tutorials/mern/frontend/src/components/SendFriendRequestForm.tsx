import React, { useEffect, useRef, useState } from 'react';

const SendFriendRequestForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null); //ref:https://www.youtube.com/watch?v=GGo3MVBFr1A
  const [userNo, setUserNo] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`Request sent to ${usernameRef.current?.value}${userNo}`);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setUserNo(value === '#' ? '' : value.length === 1 ? '#' + value : value.length === 6 ? userNo : value); //ref:ChatGPT
  };

  useEffect(() => {
    usernameRef.current?.focus(); //ref:https://blog.logrocket.com/usestate-vs-useref/
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p>Enter the username and user number (w/o #) of the player you want to send a friend request to. It's cAsE sEnSiTiVe!</p>
      <input
        ref={usernameRef}
        type='text'
        placeholder='Username'
      />
      <input
        type='text'
        value={userNo}
        placeholder='#0000'
        onChange={handleChange}
      />
      <button type='submit'>Send Friend Request</button>
    </form>
  );
};

export default SendFriendRequestForm;
