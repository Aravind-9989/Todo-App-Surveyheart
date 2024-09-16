import axios from "axios";

const ApiURL = "https://dummyjson.com/todos";

export const Fetchingdata = () => async (dispatch) => {
  try {
    const result = await axios.get(ApiURL);
    dispatch({ type: "FETCH_DATA_SUECESSFULLY", payload: result.data.todos });
  } catch (error) {
    dispatch({ type: "FETCH_DATA_ERRORS", payload: error.message });
  }
};

export const addpart = (todo) => ({ type: "ADD_TODO_LIST", payload: todo });

export const deletelist = (id) => ({ type: "DELETE_TODO_LIST", payload: id });

export const updatelist = (todo) => ({ type: "UPDATE_TODO_LIST", payload: todo });