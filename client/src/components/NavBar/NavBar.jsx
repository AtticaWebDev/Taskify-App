import { Link } from "react-router-dom";
import "./NavBar.css";

import { useState } from "react";
export function NavBar() {
  const [isLogin, setIsLogin] = useState(true);
  // const [error, setError] = useState(null);
  const viewLogin = (status) => {
    // setError(null);
    setIsLogin(status);
  };
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link className="logo" to="/">
          Taskify
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/todo"
              className="nav-sign"
              onClick={() => viewLogin(true)}
            >
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            {!isLogin && (
              <Link
                to="/todo"
                className="nav-sign"
                onClick={() => viewLogin(false)}
              >
                Inscription
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
