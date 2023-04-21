import { IUser } from '../../typescript/interfaces/IUser';
import { GiCyberEye, GiAbstract015 } from 'react-icons/gi';

const FriendInfoCard = ({ user }: { user: IUser }) => {
  const { username, userNo, title, lastOnline } = user;
  return (
    <div className='flex w-full gap-2 justify-center items-center border-pink-900 hover:bg-zinc-900 transition duration-500 border-2 p-1 rounded-xl'>
      <div className='flex w-1/5'>
        {lastOnline === 'now' ? (
          <GiCyberEye
            aria-label='GiCyberEye'
            fontSize='2.25rem'
            color='green'
          />
        ) : (
          <GiAbstract015
            aria-label='GiAbstract015'
            fontSize='2.25rem'
            color='dkgrey'
          />
        )}
      </div>
      <div className='flex flex-col justify-center w-4/5'>
        <h4>
          {`${username} `}
          <span className='text-pink-800'>{`#${userNo ?? '0000'} last online : ${lastOnline}`}</span>
        </h4>
        <h5 className='text-cyan-300'> - {title}</h5>
      </div>
    </div>
  );
};

export default FriendInfoCard;
