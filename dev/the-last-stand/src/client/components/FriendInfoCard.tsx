import { IUser } from '../../typescript/interfaces/IUser';
import { GiCyberEye, GiAbstract015 } from 'react-icons/gi';

const FriendInfoCard = ({ user }: { user: IUser }) => {
  const { username, userNo, title, lastOnline } = user;
  return (
    <div className='flex w-full gap-2 justify-center items-center'>
      {lastOnline === 'now' ? (
        <GiCyberEye
          aria-label='GiCyberEye'
          fontSize='2.5rem'
          color='green'
        />
      ) : (
        <GiAbstract015
          aria-label='GiAbstract015'
          fontSize='2.5rem'
          color='dkgrey'
        />
      )}
      <div className='flex flex-col gap-2 justify-center w-80'>
        <h4>
          {`${username}`}
          <span className='text-pink-800'>{`#${userNo ?? '0000'} - ${title}`}</span>
        </h4>
      </div>
    </div>
  );
};

export default FriendInfoCard;
