import  { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");                                                                                                                                                                                                                       
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Tes identifiants sont incorrects. Réessaye.");
      return;
    }

    const response = await fetch(`http://localhost:8000/task/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      // Ajoutez ici votre fonction setCookie
      console.log("User logged in:", data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <Link to="/">
            <h1>Taskify</h1>
          </Link>
          <h2>{isLogin ? "Connect-toi" : "Inscris-toi gratuitement"}</h2>
          <input
            type="email"
            placeholder="John@doe.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirme ton mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)}>S'inscrire</button>
          <button onClick={() => viewLogin(true)}>Se connecter</button>
        </div>
      </div>
    </div>
  );
}
