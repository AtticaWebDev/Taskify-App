import "./ListItem.css";
import { useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Modal } from "../Modal/Modal";

export function ListItem({ todo, getData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <li className="list-item">
      <div className="info-container">
        <p className="todo-title">{todo.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Modifier
        </button>
        <button className="delete">Supprimer</button>
      </div>

      {showModal && (
        <Modal
          mode={"Modifier"}
          setShowModal={setShowModal}
          getData={getData}
          todo={todo}
        />
      )}
    </li>
  );
}
