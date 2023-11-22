import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function GameDetails() {
  const [game, setGame] = useState({ name: "" });
  let navigate = useNavigate();
  let { index } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        fetch(`${API}/games/${index}`)
          .then((res) => res.json())
          .then((res) => {
            setGame(res);
          });
      } catch (error) {
        return error;
      }
    };
    fetchGame();
  }, [index]);

  const handleDelete = () => {
    fetch(`${API}/games/${index}`, { method: "DELETE" }).then(() =>
      navigate(`/games`)
    );
  };

  return (
    <div className="game-details">
      <div className="game-container">
        {game ? (
          <div>
            <h1>{game.name}</h1>
            <p>Opponent: {game.opponent}</p>
            <p>Game Time: {game.game_time}</p>
            <p>Winning Move: {game.winning_move}</p>
            <p>Most Used: {game.most_used}</p>
            <p>Won Game: {game.won_game}</p>
            <p>Pieces Taken: ${game.pieces_taken}</p>
            <div>
              <Link to={`/games/${index}/edit`}>Edit Game Info</Link>
              <button onClick={handleDelete}>Delete Game</button>
            </div>
          </div>
        ) : (
          <div className="no-game-alert">
            <div>No Game Log Available!</div>
            <div>
              <Link to="/games">Please review and select from available game logs!.</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails;