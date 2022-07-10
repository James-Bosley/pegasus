import { useOutletContext } from "react-router-dom";
import GameCard from "../../../../components/game-card/GameCard";
import "./queueView.scss";

const QueueView = () => {
  const { sessionState, socket } = useOutletContext();
  const { games } = sessionState;

  return (
    <div className="queue">
      {games.on.length > 0 ? (
        <>
          <h3 className="queue__title">Games In Progress</h3>
          {games.on.map(game => {
            return <GameCard key={game.id} game={game} socket={socket} />;
          })}
        </>
      ) : (
        <p className="queue__hold-text">No games have been selected.</p>
      )}
      {games.wait.length > 0 && (
        <>
          <h3 className="queue__title">Games Waiting</h3>
          {games.wait.map(game => {
            return <GameCard key={game.id} game={game} />;
          })}
        </>
      )}
    </div>
  );
};
export default QueueView;
