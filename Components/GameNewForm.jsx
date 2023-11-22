import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function GameNewForm() {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    name: "",
    opponent: "",
    game_time: 0,
    winning_move: "",
    most_used: "",
    pieces_taken: 0,
    won_game: false
  });

  const addGame = () => {
    const gameData = {
        name: game.name,
        opponent: game.opponent,
        game_time: game.game_time,
        winning_move: game.winning_move,
        most_used: game.most_used,
        pieces_taken: game.pieces_taken,
        won_game: game.won_game
    };
    try {
      fetch(`${API}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData)
      })
        .then((res) => res.json())
        .then(() => navigate("/games"));
    } catch (error) {
      return error;
    }
  };

  const handleTextChange = (e) => {
    const { id, value } = e.target;
    setGame({ ...game, [id]: value });
  };

  const handleCheckboxChange = () => {
    setGame({ ...game, isBanned: !game.isBanned });
  };

  const handleMoveChange = (e) => {
    const { value } = e.target;
    // If the selected value is the same as the current value, set it to an empty string
    const moveValue = value === game.move ? "" : value;
    setGame({ ...game, move: moveValue });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addGame();
    resetForm();
  };

  function resetForm() {
    setGame({
        name: "",
        opponent: "",
        game_time: 0,
        winning_move: "",
        most_used: "",
        pieces_taken: 0,
        won_game: false
    });
  }

  return (
    <div className="New">
    <h2 className="returnheader">Edit Game Details:</h2>
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        value={game.name}
        type="text"
        onChange={handleTextChange}
        placeholder="Name of Player..."
        required
      />
      <label htmlFor="opponent">Opponent:</label>
      <input
        id="opponent"
        value={game.opponent}
        type="text"
        onChange={handleTextChange}
        placeholder="Name of Opponent..."
        required
      />
      <label htmlFor="game_time">Game Time: </label>
      <input
        id="game_time"
        value={game.game_time}
        type="number"
        min="0.00"
        step="0.01"
        max="999.99"
        onChange={handleTextChange}
        placeholder="Enter time..."
      />
      <fieldset>
        <div className="radio">
          <legend>Winning Move: </legend>
          <label>
            <input
              name="winning_move"
              value="FM"
              type="radio"
              checked={game.winning_move === "FM"}
              onChange={handleMoveChange}
            />
            Fool's Mate
          </label>
          <label>
            <input
              name="winning_move"
              value="SM"
              type="radio"
              checked={game.winning_move === "SM"}
              onChange={handleMoveChange}
            />
            Scholar's Mate
          </label>
          <label>
            <input
              name="winning_move"
              value="EGM"
              type="radio"
              checked={game.winning_move === "EGM"}
              onChange={handleMoveChange}
            />
            Englund Gambit Mate
          </label>
          <label>
            <input
              name="winning_move"
              value="IGSM"
              type="radio"
              checked={game.winning_move === "IGSM"}
              onChange={handleMoveChange}
            />
            Italians Game Smothered Mate
          </label>
          <label>
            <input
              name="winning_move"
              value="O"
              type="radio"
              checked={game.winning_move === "O"}
              onChange={handleMoveChange}
            />
            Other
          </label>
        </div>
      </fieldset>
      <br />
      <br />
      <h4 className="select">Most Used: </h4>
      <select value={game.most_used} id="most_used" onChange={handleTextChange}>
        <option value=""></option>
        <option value="Pawn">Pawn</option>
        <option value="Rook">Rook</option>
        <option value="Knight">Knight</option>
        <option value="Bishop">Bishop</option>
        <option value="Queen">Queen</option>
        <option value="King">King</option>
      </select>
      <br />
      <br />
      <label htmlFor="year">Year Released: </label>
      <input
        id="year"
        value={game.year}
        type="text"
        onChange={handleTextChange}
        placeholder="Release year..."
      />
      <label htmlFor="won_game">Won Game: </label>
      <input
        id="won_game"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={game.won_game}
      />
      <br />
        <button type="submit">Seal the legacy and add to history!</button>
      </form>
      <br />
      <Link to={`/games`}>
        <button>Back To Games!</button>
      </Link>
    </div>
  );
}

export default GameNewForm;