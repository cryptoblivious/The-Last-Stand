import { IUser } from '../../typescript/interfaces/IUser';

const EditUserInfo = ({ user, className }: { user: IUser; className: string }) => {
  const { avatar, username, title } = user;

  const handleSubmit = () => {};

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
          //ref={usernameRef}
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
