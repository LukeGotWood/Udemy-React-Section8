import { useState } from "react";

import Button from "../Button/Button";
import Card from "../Card/Card";
import ErrorModal from "../ErrorModal/ErrorModal";

import styles from "./AddUser.module.css";

function AddUser(props) {
  const [userInput, setUserInput] = useState({
    enteredUsername: "",
    enteredAge: "",
  });

  const [error, setError] = useState({
    errorOccured: false,
    title: "",
    message: "",
  });

  function addUserHandler(event) {
    event.preventDefault();

    if (
      userInput.enteredUsername.trim().length === 0 ||
      userInput.enteredAge.trim().length === 0
    ) {
      setError({
        errorOccured: true,
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+userInput.enteredAge < 1) {
      setError({
        errorOccured: true,
        title: "Invalid Age",
        message: "Please enter a valid age (> 0).)",
      });
      return;
    }

    const newUser = {
      name: userInput.enteredUsername,
      age: userInput.enteredAge,
    };

    props.onAddUser(newUser);

    setUserInput({
      enteredUsername: "",
      enteredAge: "",
    });
  }

  function usernameChangeHandler(event) {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredUsername: event.target.value,
      };
    });
  }

  function ageChangeHandler(event) {
    setUserInput((prevState) => {
      return {
        ...prevState,
        enteredAge: event.target.value,
      };
    });
  }

  function errorHandler(event) {
    setError({
      errorOccured: false,
      title: "",
      message: "",
    });
  }

  return (
    <div>
      {error.errorOccured && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userInput.enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={userInput.enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
