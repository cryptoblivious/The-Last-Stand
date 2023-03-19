import { IUser } from '../../typescript/interfaces/IUser';

const EditUserInfo = ({ user, className }: { user: IUser; className: string }) => {
  const { avatar, username, title } = user;
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
        <input
          className='w-full placeholder-pink-900 placeholder-opacity-50 text-pink-900'
          //ref={usernameRef}
          value={title}
          type='text'
          placeholder='Title'
        />
      </form>
    </div>
  );
};

export default EditUserInfo;
