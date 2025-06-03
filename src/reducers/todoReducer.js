import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, actions) {
  switch (actions.type) {
    case "add": {
      const updatedTodos = [
        ...currentTodos,
        {
          id: uuidv4(),
          title: actions.payload.title,
          details: "",
          isCompleted: false,
        },
      ];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "del": {
      const updatedTodos = [...currentTodos].filter((t) => {
        return t.id !== actions.payload.todoId;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "update": {
      const updatedTodos = [...currentTodos].map((t) => {
        if (t.id === actions.payload.todoId) {
          return {
            ...t,
            title: actions.payload.title,
            details: actions.payload.details,
          };
        } else return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "check": {
      const updatedTodos = [...currentTodos].map((t) => {
        if (t.id === actions.payload.todoId) {
          return { ...t, isCompleted: !t.isCompleted };
        } else return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "load": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default:
      throw console.error("Error : unknowing action :" + actions.type);
  }
}
