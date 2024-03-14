import { Link } from "react-router-dom";
import "./Register.css";
export function Register() {
  return (
    <div className="register">
      <div className="navbar">
        <div className="nav-container">
          <Link className="logo" to="/">
            Taskify
          </Link>
          {/* <ul className="nav-menu">
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
        </ul> */}
        </div>
      </div>

      <div className="form-box">
        <div className="register-container">
          <div className="register-top">
            <h3>Inscris-toi gratuitement</h3>
            <p>
              Déjà membre ?{" "}
              <span>
                <Link to="/login">Connectez-vous</Link>
              </span>
            </p>
          </div>
          <div className="register-two-forms">
            <div className="input-box">
              <input type="text" className="input-field" placeholder="Nom" />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <h3>Taskify</h3>
          <p>Planifiez devient facile</p>
        </div>
        <div className="footer-bottom">
          <p>
            copyright &copy; 2024 <span>Taskify.</span> Développer par Dylan
            Agboton | Attica
          </p>
        </div>
      </footer>
    </div>
  );
}
