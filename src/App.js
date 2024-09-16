
import React, { useRef, useState } from "react";
import TodoList from "./Listofitems/todolist";
import TodoForm from "./Listofitems/addtodo";
import { Container, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [editingTodo, setEditingTodo] = useState(null);
  const topRef = useRef(null);

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    topRef.current.scrollIntoView({ behavior: "smooth" });
    topRef.current.focus();
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <Container>
      <Typography
        variant="h2"
        gutterBottom
        textAlign={"center"}
        color="#1d1d1d"
      >
        <h6>Todo App</h6>

      </Typography>
      <TodoForm
        topRef={topRef}
        todoToEdit={editingTodo}
        onCancel={handleCancelEdit}
      />
      <TodoList
        topRef={topRef}
        onEdit={handleEditTodo}
        onCancel={handleCancelEdit}
      />
    </Container>
  );
};

export default App;
