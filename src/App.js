import { useState } from "react";

import AddUser from "./components/AddUser/AddUser";
import UsersList from "./components/UsersList/UsersList";

const DUMMY_DATA = [
  { name: "Luke", age: "23" },
  { name: "Bee", age: "20" },
  { name: "Jack", age: "23" },
  { name: "Mike", age: "24" },
  { name: "Jim", age: "23" },
  { name: "Bob", age: "25" },
  { name: "Sam", age: "23" },
];

function App() {
  const [usersList, setUsersList] = useState([]);

  function addUserHandler(user) {
    setUsersList((prevState) => {
      return [...prevState, user];
    });
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
