import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${API}/games`)
          .then((res) => res.json())
          .then((res) => {
            setGames(res);
          });
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-games">
      <h1>Games Logs:</h1>
      <table>
        <thead>
          <tr>
            <th>Players Name</th>
            <th>Opponent</th>
            <th>Game Time</th>
            <th>Winning Move</th>
            <th>Most Used</th>
            <th>Pieces Taken</th>
            <th>Won Game</th>
          </tr>
        </thead>
        <tbody>
          {games.map((item) => (
            <tr key={item.id} className="Game">
              <td>
                <Link to={`/games/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.opponent}</td>
              <td>{item.game_time}</td>
              <td>{item.winning_move}</td>
              <td>{item.most_used}</td>
              <td>{item.pieces_taken}</td>
              <td>{item.won_game}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Games;