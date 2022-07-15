import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./resultsModal.scss";

interface Props {
  close: Function;
  game: any;
  socket: any;
}

type WinnersState = number[];

interface ScoresState {
  win_score: null | number;
  lose_score: null | number;
}

const ResultsModal = ({ close, game, socket }: Props): JSX.Element => {
  const [winners, setWinners] = useState<WinnersState>([]);
  const [scores, setScores] = useState<ScoresState>({ win_score: null, lose_score: null });

  const handleScores = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScores(prevState => ({ ...prevState, [e.target.name]: Number(e.target.value) }));
  };

  const getChecked = (id: number) => {
    if (winners.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleWinners = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (winners.includes(Number(e.target.name))) {
      setWinners(prevState => prevState.filter(winner => winner !== Number(e.target.name)));
    } else {
      setWinners(prevState => [...prevState, Number(e.target.name)]);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!scores.win_score || !scores.lose_score) {
      toast.error("Please enter scores");
      return;
    }

    if (scores.win_score < scores.lose_score || scores.win_score < 21) {
      toast.error("Please enter a valid score");
      return;
    }

    const losers = game.players
      .filter((player: any) => !winners.includes(player.id))
      .map((player: any) => player.id);

    if (!winners.length || winners.length !== losers.length) {
      toast.error("Please enter a valid result");
      return;
    }

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
          {game.players.map((player: any) => {
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
              value={String(scores.win_score)}
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
              value={String(scores.lose_score)}
              onChange={handleScores}
            />
          </label>
        </div>
        <div className="results__cta-container">
          <button
            className="results__button styled-button-light"
            type="button"
            onClick={() => close()}
          >
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
