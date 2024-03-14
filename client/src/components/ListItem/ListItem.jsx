import "./ListItem.css";
import { useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Modal } from "../Modal/Modal";

export function ListItem({ todo, getData }) {
  const [showModal, setShowModal] = useState(false);
  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/task/${todo.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        <button className="delete" onClick={deleteItem}>
          Supprimer
        </button>
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
