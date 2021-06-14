import { useState, Fragment, useRef } from "react";

import Button from "../Button/Button";
import Card from "../Card/Card";
import ErrorModal from "../ErrorModal/ErrorModal";

import styles from "./AddUser.module.css";

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState({
    errorOccured: false,
    title: "",
    message: "",
  });

  function addUserHandler(event) {
    event.preventDefault();

    if (
      nameInputRef.current.value.trim().length === 0 ||
      ageInputRef.current.value.trim().length === 0
    ) {
      setError({
        errorOccured: true,
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+ageInputRef.current.value < 1) {
      setError({
        errorOccured: true,
        title: "Invalid Age",
        message: "Please enter a valid age (> 0).)",
      });
      return;
    }

    const newUser = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
    };

    props.onAddUser(newUser);
    
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  }

  function errorHandler(event) {
    setError({
      errorOccured: false,
      title: "",
      message: "",
    });
  }

  return (
    <Fragment>
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
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
}

export default AddUser;
