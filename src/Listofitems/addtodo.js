import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addpart, updatelist } from "../reduxcomponents/action";
import { Button, TextField } from "@mui/material";

const TodoForm = ({ currentTodo, onCancelEdit, inputRef }) => {
  const [todoText, setTodoText] = useState(currentTodo ? currentTodo.todo : "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      setTodoText(currentTodo.todo);
    } else {
      setTodoText("");
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTodo) {
      dispatch(
        updatelist({
          id: currentTodo.id,
          todo: todoText,
        })
      );
    } else {
      dispatch(
        addpart({
          id: Date.now(),
          todo: todoText,
        })
      );
    }
    setTodoText("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{ height: "15px" }}
        inputRef={inputRef}
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        required
        placeholder="Todo"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginRight: "-385px", position: "relative", top: "-20px" }}
      >
        {currentTodo ? "Update Todo" : "Add Todo"}
      </Button>
      {currentTodo && <Button onClick={onCancelEdit}>Cancel</Button>}
    </form>
  );
};

export default TodoForm;
