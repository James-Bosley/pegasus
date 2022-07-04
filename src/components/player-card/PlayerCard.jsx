import goldTrophy from "../../assets/icons/gold-trophy.svg";
import blackTrophy from "../../assets/icons/black-trophy.svg";
import "./playerCard.scss";

const PlayerCard = ({ player, selectedPlayers, toggleSelected }) => {
  const selected = selectedPlayers.includes(player.id);

  return (
    <li
      className={`player ${selected && "player--selected"}`}
      onClick={() => toggleSelected(player.id)}
    >
      <p className="player__name">{player.display_name}</p>
      {player.wins && !player.losses ? (
        <div className="wins">
          <img src={goldTrophy} alt="trophy" className="wins__icon" />
        </div>
      ) : (
        <div className="wins"></div>
      )}
      {player.wins ? (
        <div className="wins">
          <img src={blackTrophy} alt="trophy" className="wins__icon" />
          <p className="wins__text">{player.wins}</p>
        </div>
      ) : (
        <div className="wins"></div>
      )}
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
    </li>
  );
};

export default PlayerCard;
