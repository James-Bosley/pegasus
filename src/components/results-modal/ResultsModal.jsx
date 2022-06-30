import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResultsModal = ({ close, game, socket }) => {
  const [winners, setWinners] = useState([]);
  const [scores, setScores] = useState({ win_score: "", lose_score: "" });

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

    const losers = game.players.filter(player => !winners.includes(player.id));
    socket.emit("game-update", { type: "record-result", payload: { ...scores, winners, losers } });
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
                {player.display_name}
                <input
                  type="checkbox"
                  name={player.id}
                  checked={getChecked(player.id)}
                  onChange={handleWinners}
                />
              </label>
            );
          })}
        </div>
        <h3 className="results__sub-title">Scores</h3>
        <div className="reuslts__scores">
          <input
            type="number"
            min="0"
            name="win_score"
            placeholder="0"
            value={scores.win_score}
            onChange={handleScores}
          />
          <input
            type="number"
            min="0"
            name="lose_score"
            placeholder="0"
            value={scores.lose_score}
            onChange={handleScores}
          />
        </div>
        <div className="results__cta-container">
          <button className="styled-button-light" type="button" onClick={close}>
            Cancel
          </button>
          <button className="styled-button-action" type="submit">
            Submit Result
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResultsModal;
