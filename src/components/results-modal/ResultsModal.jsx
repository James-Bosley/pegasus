import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./resultsModal.scss";

const ResultsModal = ({ close, game, socket }) => {
  const [winners, setWinners] = useState([]);
  const [scores, setScores] = useState({ win_score: 0, lose_score: 0 });

  const handleScores = ({ target }) => {
    setScores(prevState => ({ ...prevState, [target.name]: Number(target.value) }));
  };

  const getChecked = id => {
    if (winners.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleWinners = ({ target }) => {
    if (winners.includes(Number(target.name))) {
      setWinners(prevState => prevState.filter(winner => winner !== Number(target.name)));
    } else {
      setWinners(prevState => [...prevState, Number(target.name)]);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    const losers = game.players
      .filter(player => !winners.includes(player.id))
      .map(player => player.id);

    socket.emit("game-update", {
      gameId: game.id,
      update: {
        type: "record-result",
        payload: { ...scores, winningPlayers: winners, losingPlayers: losers },
      },
    });

    toast.success("Result recorded!");
    navigate("/games/pick");
    close();
  };

  return (
    <div className="results">
      <h2 className="results__title">Enter Result</h2>
      <form className="results__form" onSubmit={handleSubmit}>
        <h3 className="results__sub-title">Choose winners</h3>
        <div className="results__players">
          {game.players.map(player => {
            return (
              <label className="results__label" key={player.id}>
                <input
                  type="checkbox"
                  className="results__checkbox"
                  name={player.id}
                  checked={getChecked(player.id)}
                  onChange={handleWinners}
                />
                {player.display_name}
              </label>
            );
          })}
        </div>
        <h3 className="results__sub-title">Scores</h3>
        <div className="results__scores">
          <label className="results__scores-label">
            Winning Score
            <input
              type="number"
              className="results__scores-input"
              min="0"
              name="win_score"
              placeholder="0"
              value={scores.win_score}
              onChange={handleScores}
            />
          </label>
          <label className="results__scores-label">
            Losing Score
            <input
              type="number"
              className="results__scores-input"
              min="0"
              name="lose_score"
              placeholder="0"
              value={scores.lose_score}
              onChange={handleScores}
            />
          </label>
        </div>
        <div className="results__cta-container">
          <button className="results__button styled-button-light" type="button" onClick={close}>
            Cancel
          </button>
          <button className="results__button styled-button-action" type="submit">
            Submit Result
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResultsModal;
