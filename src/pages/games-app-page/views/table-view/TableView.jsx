import { useOutletContext } from "react-router-dom";
import "./tableView.scss";

const TableView = () => {
  const { sessionState } = useOutletContext();

  const allPlayers = [
    ...sessionState.queue,
    ...sessionState.games.on.flatMap(game => game.players),
    ...sessionState.games.wait.flatMap(game => game.players),
  ];

  const tableData = allPlayers
    .map(plr => {
      return { ...plr, percent: (plr.wins / (plr.losses + plr.wins)) * 100 || 0 };
    })
    .sort((a, b) => b.percent - a.percent);

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row table__row--header">
          <td className="table__data table__data--header table__data--rank"></td>
          <td className="table__data table__data--header table__data--name">Player</td>
          <td className="table__data table__data--header">Wins</td>
          <td className="table__data table__data--header">Losses</td>
          <td className="table__data table__data--header">%</td>
        </tr>
      </thead>
      <tbody className="table__body">
        {tableData.map((player, i) => {
          return (
            <tr key={player.id} className="table__row">
              <td className="table__data table__data--rank">{i + 1}</td>
              <td className="table__data table__data--name">{player.display_name}</td>
              <td className="table__data">{player.wins || 0}</td>
              <td className="table__data">{player.losses || 0}</td>
              <td className="table__data table__data--percent">{Math.trunc(player.percent)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TableView;
