import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../reduxcomponents/action";
import { Button, TextField } from "@mui/material";

const TodoForm = ({ todoToEdit, onCancel, topRef }) => {
  const [todo, setTodo] = useState(todoToEdit ? todoToEdit.todo : "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
    } else {
      setTodo("");
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoToEdit) {
      dispatch(
        updateTodo({
          id: todoToEdit.id,
          todo,
        })
      );
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          todo,
        })
      );
    }
    setTodo("");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField style={{height:"15px"}}
        inputRef={topRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
        placeholder="Todo"
      
      />
      <Button type="submit" variant="contained" color="primary" style={{marginRight:"-385px",position:"relative",top:"-20px"}}>
        {todoToEdit ? "Update Todo" : "Add Todo"}
      </Button >
      {todoToEdit && <Button onClick={onCancel}>Cancel</Button>}
    </form>
  );
};

export default TodoForm;