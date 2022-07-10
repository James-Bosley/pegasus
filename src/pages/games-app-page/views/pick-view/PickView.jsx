import { useContext, useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../App";
import PlayerCard from "../../../../components/player-card/PlayerCard";
import toast from "react-hot-toast";
import "./pickView.scss";

const PickView = () => {
  const { sessionState, socket } = useOutletContext();
  const { queue } = sessionState;
  const { user } = useContext(UserContext);

  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const toggleSelected = id => {
    setSelectedPlayers(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(playerId => playerId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  useEffect(() => {
    selectedPlayers.forEach(plr => {
      if (!queue.map(i => i.id).includes(plr)) {
        toggleSelected(plr);
      }
    });
  }, [selectedPlayers, queue]);

  const navigate = useNavigate();
  const handleNewGame = () => {
    if (selectedPlayers.length && selectedPlayers.length % 2 === 0) {
      socket.emit("game-create", { players: selectedPlayers, selectingPlr: user.id });
      navigate("/games/queue");
    } else {
      toast.error("Please select a vaild game");
    }
  };

  return (
    <div className="pick">
      {queue.length > 0 ? (
        <div>
          <h3 className="pick__sub-header">Player Choosing</h3>

          <PlayerCard
            player={queue[0]}
            selectedPlayers={selectedPlayers}
            toggleSelected={toggleSelected}
          />
        </div>
      ) : (
        <p className="pick__hold-text">No players are in the queue. Please join!</p>
      )}
      {queue.length > 1 && (
        <>
          <h3 className="pick__sub-header">Choose From</h3>
          <ul className="pick__list">
            {queue.slice(1, 8).map(player => {
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  selectedPlayers={selectedPlayers}
                  toggleSelected={toggleSelected}
                />
              );
            })}
          </ul>
        </>
      )}
      {queue.length > 1 && (
        <button className="pick__button styled-button-action" onClick={handleNewGame}>
          Create Game
        </button>
      )}
      {queue.length > 9 && (
        <>
          <h3 className="pick__sub-header">Waiting</h3>
          <ul className="pick__list">
            {queue.slice(9).map(player => {
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  selectedPlayers={selectedPlayers}
                  toggleSelected={toggleSelected}
                />
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
export default PickView;
