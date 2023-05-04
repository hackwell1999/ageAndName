import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [EnteredAge, setEnteredAge] = useState("");
  const [error,setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredName.trim().length === 0 || EnteredAge.trim().length === 0) {
      setError({
        title:"Invalid input",
        message:"Please enter a valid name and age (non-empty values)"
      })
      return;
    }
    if (+EnteredAge < 1) {
      setError({
        title:"Invalid age",
        message:"Please enter a valid age (> 0)"
      })
      return;
    }
    props.onAddUsers(enteredName, EnteredAge);
    setEnteredAge("");
    setEnteredName("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () =>{
    setError(null)
  }

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredName}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            value={EnteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
