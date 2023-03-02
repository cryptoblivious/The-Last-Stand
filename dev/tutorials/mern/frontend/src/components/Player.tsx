interface IPlayer {
  player: {
    username: string;
    userNo: number;
  };
}

const Player: React.FC<IPlayer> = ({ player }) => {
  return (
    <div className='player'>
      <h4>username : {player.username}</h4>
      <p>
        <strong>user no : {player.userNo}</strong>
      </p>
    </div>
  );
};

export default Player;
