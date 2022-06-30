import "./playerCard.scss";

const PlayerCard = ({ player, selectedPlayers, toggleSelected }) => {
  const selected = selectedPlayers.includes(player.id);

  return (
    <div
      className={`player ${selected && "player--selected"}`}
      onClick={() => toggleSelected(player.id)}
    >
      <p className="player__name">{player.display_name}</p>
      {player.gender ? (
        <p
          className={`player__attribute player__attribute--gender ${
            player.gender === "m" ? "player__attribute--male" : "player__attribute--female"
          }`}
        >
          {player.gender.toUpperCase()}
        </p>
      ) : (
        <p className="player__attribute player__attribute--gender"></p>
      )}
      {player.handedness ? (
        <p
          className={`player__attribute player__attribute--hand ${
            player.handedness === "r" ? "player__attribute--right" : "player__attribute--left"
          }`}
        >
          {player.handedness === "r" ? "Right Handed" : "Left Handed"}
        </p>
      ) : (
        <p className="player__attribute player__attribute--hand"></p>
      )}
    </div>
  );
};

export default PlayerCard;
