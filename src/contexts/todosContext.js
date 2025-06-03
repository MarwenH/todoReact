import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todoReducer";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider
      value={{ todos: todos, todosDispatch: todosDispatch }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodosContext);
};

export default TodosProvider;
