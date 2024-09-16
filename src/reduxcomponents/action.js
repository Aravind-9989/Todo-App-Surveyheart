import axios from "axios";

const URL = "https://dummyjson.com/todos";

export const fetchTodos = () => async (dispatch) => {
  try {
    const result = await axios.get(URL);
    dispatch({ type: "FETCH_TODOS_SUCCESS", payload: result.data.todos });
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_ERROR", payload: error.message });
  }
};

export const addTodo = (todo) => ({ type: "ADD_TODO", payload: todo });

export const deleteTodo = (id) => ({ type: "DELETE_TODO", payload: id });

export const updateTodo = (todo) => ({ type: "UPDATE_TODO", payload: todo });