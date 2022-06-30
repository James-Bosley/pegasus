import { useOutletContext } from "react-router-dom";
import GameCard from "../../components/game-card/GameCard";
import "./queueView.scss";

const QueueView = () => {
  const { sessionState, socket } = useOutletContext();
  const { games } = sessionState;

  // GAME START LOGIC

  return (
    <div>
      {games.length > 0 ? (
        <>
          <h3 className="queue__title">Games In Progress</h3>
          {games.slice(0, 3).map(game => {
            return <GameCard key={game.id} game={game} socket={socket} />;
          })}
        </>
      ) : (
        <p>No games have been selected.</p>
      )}
      {games.length > 3 && (
        <>
          <h3 className="queue__title">Games Waiting</h3>
          {games.slice(3).map(game => {
            return <GameCard key={game.id} game={game} />;
          })}
        </>
      )}
    </div>
  );
};
export default QueueView;
