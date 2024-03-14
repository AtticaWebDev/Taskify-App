import { Link } from "react-router-dom";
import "./Home.css";
import Images from "../assets/images/pngegg.png";

export function Home() {
  return (
    <div className="hero row container">
      <div className="content">
        <h1>
          Découvrez <span>Taskify :</span>
        </h1>
        <p>L'outil parfait pour gérer vos tâches au quotidien.</p>

        <Link tp="/login" className="hero-btn">
          Listez vos tâches.
        </Link>
      </div>
      <div className="row">
        <img src={Images} />
      </div>
    </div>
  );
}
