import { IUser } from '../../typescript/interfaces/IUser';

const ShowUserInfo = ({ user, className }: { user: IUser; className?: string }) => {
  const { avatar, username, title, userNo } = user;
  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <img
        className='border-purple-900 h-24 w-24 border-2 rounded-full'
        src={avatar}></img>
      <div className='flex flex-col gap-2 justify-center w-80'>
        <h4 className='text-green-500'>
          {`${username} `}
          <span className='text-green-700'>{`#${userNo ?? '0000'}`}</span>
        </h4>
        <h4 className='text-cyan-300'>{` - ${title}`}</h4>
      </div>
    </div>
  );
};

export default ShowUserInfo;
