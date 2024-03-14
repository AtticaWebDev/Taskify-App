import "./ListHeader.css";
import { Modal } from "../Modal/Modal";
import { useState, useEffect } from "react";

export function ListHeader({ listName, getData }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Si showModal est vrai, assurez-vous que la modal est affichée
    if (showModal) {
      const modalTimer = setTimeout(() => setShowModal(true), 0); // Ajoute un délai de 0ms pour s'assurer que le rendu est effectué
      return () => clearTimeout(modalTimer); // Nettoie le timer lorsque le composant est démonté
    }
  }, [showModal]);

  const signOut = () => {
    console.log("signout");
  };

  const handleCreateTask = () => {
    setShowModal(true);
  };

  const handleCreateSuccess = () => {
    setShowModal(false);
    getData();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={handleCreateTask}>
          Créer
        </button>
        <button className="signout" onClick={signOut}>
          Quitter
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"Créer"}
          setShowModal={setShowModal}
          getData={handleCreateSuccess}
        />
      )}
    </div>
  );
}
