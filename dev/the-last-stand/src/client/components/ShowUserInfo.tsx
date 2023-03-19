import { IUser } from '../../typescript/interfaces/IUser';

const ShowUserInfo = ({ avatar, username, userNo, title }: IUser) => {
  return (
    <div className='flex w-full gap-4'>
      <img
        className='border-purple-900 h-24 border-2 rounded-full'
        src={avatar}></img>
      <div className='flex flex-col gap-2 justify-center w-80'>
        <h4>
          {`${username}`}
          <span className='text-pink-800'>{`#${userNo ?? '0000'}`}</span>
        </h4>
        <h4>{`${title}`}</h4>
      </div>
    </div>
  );
};

export default ShowUserInfo;
