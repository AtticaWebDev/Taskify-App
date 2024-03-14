import "./Modal.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export function Modal({ mode, setShowModal, getData, todo }) {
  const [cookies] = useCookies(["AuthToken"]);

  const editMode = mode === "Modifier";

  const [data, setData] = useState({
    user_email: cookies.Email,
    title: "",
    progress: 50,
    date: new Date(),
  });

  useEffect(() => {
    if (editMode && todo) {
      setData({
        user_email: todo.user_email,
        title: todo.title,
        progress: todo.progress,
        date: todo.date,
      });
    }
  }, [editMode, todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form"); // Ajouter un message de débogage pour vérifier si la soumission est déclenchée
    try {
      const url = editMode
        ? `http://localhost:8000/task/${todo.id}`
        : "http://localhost:8000/task";
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.AuthToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(`Tâche ${editMode ? "modifiée" : "créée"} avec succès !`);
        getData();
        setShowModal(false);
      } else {
        console.error(`Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>{mode} une tâche</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            maxLength={30}
            placeholder="Saisir votre tâche"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">
            Faites glisser pour sélectionner votre progression actuelle
          </label>
          <input
            type="range"
            id="range"
            required
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className="mode"
            type="submit"
            value={editMode ? "Modifier" : "Créer"}
          />
        </form>
      </div>
    </div>
  );
}
