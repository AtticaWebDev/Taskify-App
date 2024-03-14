import { ListHeader } from "../components/ListHeader/ListHeader";
import { ListItem } from "../components/ListItem/ListItem";
import { useEffect, useState } from "react";

export function Todo() {
  const userEmail = "kriss@lolo.com";
  const [todos, setTodos] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/task/${userEmail}`);
      const json = await response.json();
      setTodos(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData(); // Appel de la fonction getData à l'intérieur de useEffect
  }, []); // Dépendance vide pour exécuter l'effet une seule fois lors du montage du composant

  console.log(todos);

  const sortedTodos = todos?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      <div className="app-list">
        <ListHeader listName={"Taskify "} getData={getData} />
        {sortedTodos?.map((todo) => (
          <ListItem key={todo.id} todo={todo} getData={getData} /> // Passer getData aux ListItem
        ))}
      </div>
      {/* <Footer /> */}
    </>
  );
}
