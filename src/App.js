
import React, { useRef, useState } from "react";
import TodoList from "./Listofitems/todolist";
import TodoForm from "./Listofitems/addtodo";
import { Container, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [changingTodo, setchangingTodo] = useState(null);
  const topRef = useRef(null);

  const handleEditingTodo = (todo) => {
    setchangingTodo(todo);
    topRef.current.scrollIntoView({ behavior: "smooth" });
    topRef.current.focus();
  };

  const handledropEdit = () => {
    setchangingTodo(null);
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
        todoToEdit={changingTodo}
        onCancel={handledropEdit}
      />
      <TodoList
        topRef={topRef}
        onEdit={handleEditingTodo}
        onCancel={handledropEdit}
      />
    </Container>
  );
};

export default App;
