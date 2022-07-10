import ResultsModal from "../results-modal/ResultsModal";
import Popup from "reactjs-popup";
import "./gameCard.scss";

const GameCard = ({ game, socket }) => {
  // Socket prop is only passed to active games.

  const { players, selected_by } = game;

  return (
    <div className="game">
      <div className="game__player-container">
        {players.map(plr => {
          return (
            <div className="game__player-card" key={plr.id}>
              <p className="game__player-name">{plr.display_name}</p>
            </div>
          );
        })}
      </div>
      <p className="game__selector">Game selected by {selected_by.display_name}</p>
      {socket && (
        <div className="game__cta">
          <Popup
            trigger={<button className="game__button styled-button-brand">Enter Result</button>}
            position="center center"
            modal
          >
            {close => <ResultsModal close={close} game={game} socket={socket} />}
          </Popup>
        </div>
      )}
    </div>
  );
};
export default GameCard;
