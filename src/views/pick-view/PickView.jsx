import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import PlayerCard from "../../components/player-card/PlayerCard";
import "./pickView.scss";

const PickView = () => {
  const { sessionState, socket } = useOutletContext();
  const { queue } = sessionState;

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

  const handleNewGame = () => {
    if (selectedPlayers.length % 2 === 0) {
      socket.emit("game-create", selectedPlayers, queue[0].id);
    } else {
      toast.error("Please select a vaild game");
    }
  };

  return (
    <div>
      {queue.length > 0 ? (
        <>
          <h3>Player Choosing</h3>
          <div>
            <PlayerCard
              player={queue[0]}
              selectedPlayers={selectedPlayers}
              toggleSelected={toggleSelected}
            />
          </div>
        </>
      ) : (
        <p>No players are in the queue. Please join!</p>
      )}
      {queue.length > 1 && (
        <>
          <h3>Choose From:</h3>
          <ul>
            {queue.slice(1, 8).map(player => {
              return (
                <li key={player.id}>
                  <PlayerCard
                    player={player}
                    selectedPlayers={selectedPlayers}
                    toggleSelected={toggleSelected}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
      {queue.length > 9 && (
        <>
          <h3>Waiting:</h3>
          <ul>
            {queue.slice(9).map(player => {
              return (
                <li key={player.id}>
                  <PlayerCard
                    player={player}
                    selectedPlayers={selectedPlayers}
                    toggleSelected={toggleSelected}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
      {queue.length > 1 && (
        <button className="styled-button-action" onClick={handleNewGame}>
          Create Game
        </button>
      )}
    </div>
  );
};
export default PickView;
