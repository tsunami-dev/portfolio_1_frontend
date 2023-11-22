import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <h1>
                <Link to ="/games">Games</Link> 
                <br/>
                <img src="/logo.png" width="7%" />
            </h1>
           
            <button>
                <Link to="/games/new">Add Your History</Link>
            </button>
            <button>
                <Link to="/games/:index/edit">Rewrite The History</Link>
            </button>
        </nav>
    )
}