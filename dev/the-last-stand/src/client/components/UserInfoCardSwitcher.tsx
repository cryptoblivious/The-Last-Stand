import EditButton from './EditButton';
import ShowUserInfo from './ShowUserInfo';
import EditUserInfo from './EditUserInfo';
import { IUser } from '../../typescript/interfaces/IUser';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../fetches/users';

// TODO: ADD LISTENER TO USER INFO CARD TO DETECT IF USER DATA HAS CHANGED
const UserInfoCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDoneEditing, setIsDoneEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<IUser | null>(null);

  // // SKIPPER : Removed user since no acces to db
  // useEffect(() => {
  //   setIsLoading(true);
  //   async function fetchData() {
  //     const user = await getCurrentUser();
  //     setUser(user);
  //   }
  //   fetchData();
  //   setIsLoading(false);
  // }, [isDoneEditing]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleToggleEdit = () => {
    isEditing ? setIsDoneEditing(true) : setIsDoneEditing(false);
    setIsEditing(!isEditing);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    user && (
      <div
        className='flex gap-4 w-full justify-evenly rounded-tl-3xl transition ease-in-out duration-300'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <EditButton
          className={`absolute top-2 left-1 w-fit h-fit ${isHovered ? 'opacity-100' : 'opacity-0'} transition duration-1000`}
          onClick={handleToggleEdit}
        />
        <EditUserInfo
          className={`${isEditing ? '' : 'hidden'}`}
          user={user}
          isDoneEditing={isDoneEditing}
        />
        <ShowUserInfo
          user={user}
          className={`${isEditing ? 'hidden' : ''}`}
        />
      </div>
    )
  );
};

export default UserInfoCard;
