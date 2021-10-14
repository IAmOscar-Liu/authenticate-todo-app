import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { Record } from "../types";

interface TodosContextProps {
  todos: Record[];
  setTodos: Dispatch<SetStateAction<Record[]>> | null;
  refreshTodos: () => void;
  updateTodo: (updateTodo: Record) => void;
  deleteTodo: (id: string) => void;
  addTodo: (description: string) => void;
}

const TodosContext = createContext<TodosContextProps>({
  todos: [],
  setTodos: null,
  refreshTodos: () => {},
  updateTodo: (updateTodo: Record) => {},
  deleteTodo: (id: string) => {},
  addTodo: (description: string) => {},
});

interface Props {
  children: JSX.Element;
}

const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Record[]>([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch(`/api/getTodos`);
      const latestTodos = (await res.json()) as Record[];
      setTodos(latestTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const res = await fetch(`/api/createTodo`, {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = (await res.json()) as Record;
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updateTodo: Record) => {
    try {
      const res = await fetch(`/api/updateTodo`, {
        method: "PUT",
        body: JSON.stringify(updateTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTodo = (await res.json()) as Record;
      setTodos((prev) => {
        const existingTodos = [...prev];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/deleteTodo`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodos, updateTodo, deleteTodo, addTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;

export const useTodosContext = () => useContext(TodosContext);
