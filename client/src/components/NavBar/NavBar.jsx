import { Link } from "react-router-dom";
import "./NavBar.css";
export function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link className="logo" to="/">
          Taskify
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/login" className="nav-sign">
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-sign">
              Inscription
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
