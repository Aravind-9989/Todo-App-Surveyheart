
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, fetchTodos, updateTodo } from "../reduxcomponents/action";
import "./todo.css"
const TodoList = ({ onEdit, topRef, onCancel }) => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    onCancel();
  };

  const handleEdit = (todo) => {
    onEdit(todo);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    topRef.current.focus();
  };

  const handleCheckboxChange = (id, completed, todo) => {
    dispatch(updateTodo({ id, completed: !completed, todo }));
    onCancel();
  };

  return (
    <table className="todo-table" style={{border:"2px solid black",textAlign:"center",justifyContent:"center",width:"100%",gap:"20px"}}>
      <thead>
        <tr style={{border:"2px solid black",width:"100%",height:"100%"}}>
          <th>Completed</th>
          <th>Task</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleCheckboxChange(todo.id, todo.completed, todo.todo)
                }
              />
            </td>
            <td style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.todo}
            </td>
            <td>
              {!todo.completed && (
                <button
                  className="todo-button edit-button"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
              )}
            </td>
            <td>
              <button
                className="todo-button delete-button"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
