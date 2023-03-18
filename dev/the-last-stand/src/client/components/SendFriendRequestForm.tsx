import { useEffect, useRef, useState } from 'react';

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
      className='flex flex-col gap-2 p-5'>
      <h4 className='text-pink-900'>Friend Request</h4>
      <p>Enter the username and user number of the player. It's cAsE sEnSiTiVe!</p>
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
      <button className='w-fit bg-purple-900 rounded-xl p-1 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>Send Friend Request</button>
    </form>
  );
};

export default SendFriendRequestForm;
