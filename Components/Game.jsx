import { Link } from "react-router-dom";

function Game ({ game }) {
    return(
        <tr>
            <td>
             {game.won_game ? (
                <span>🏆</span>
            ) :  (
                <span>&nbsp; &nbsp; &nbsp;</span>
            )}
            </td>
            <td>
                <Link to ={`/games/${game.id}`}>{game.name}</Link>
            </td>
        </tr>
    );
}

export default Game;