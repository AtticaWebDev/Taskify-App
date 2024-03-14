import { Auth } from "../components/Auth/Auth";
import { ListHeader } from "../components/ListHeader/ListHeader";
import { ListItem } from "../components/ListItem/ListItem";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export function Todo() {
  const [cookies, setCookie, removeCookie] = useCookies(["AuthToken", "Email"]);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
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
    if (authToken) {
      getData();
    }
  }, [authToken, userEmail]); // Dépendance userEmail ajoutée pour que useEffect s'exécute lorsque l'email change

  const sortedTodos = todos?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app-list">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"Taskify"} getData={getData} />
          {sortedTodos?.map((todo) => (
            <ListItem key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </div>
  );
}
