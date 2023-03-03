interface IPlayerGreeting {
  player: {
    username: string;
    userNo: number;
    title: string;
  };
}

const PlayerDetails: React.FC<IPlayerGreeting> = ({ player }) => {
  return (
    <div className='player'>
      <h4>{`Welcome, ${player.username}#${player.userNo}, ${player.title}!!!`}</h4>
    </div>
  );
};

export default PlayerDetails;
