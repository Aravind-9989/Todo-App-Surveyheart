const initialState = {
  todos: [],
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUECESSFULLY":
      return { ...state, todos: action.payload };
    case "FETCH_DATA_ERRORS":
      return { ...state, error: action.payload };
    case "ADD_TODO_LIST":
      return { ...state, todos: [ action.payload,...state.todos] };
    case "DELETE_TODO_LIST":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "UPDATE_TODO_LIST":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: action.payload.completed,
                todo: action.payload.todo,
              }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;