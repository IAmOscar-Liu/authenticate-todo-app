import React, { useState } from "react";
import { useTodosContext } from "../contexts/TodosContext";

interface Props {}

const TodoForm: React.FC<Props> = ({}) => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodosContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="todo">
          Todo
        </label>
        <input
          className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="ex. Learn about authentication"
        />
      </div>
      <button
        className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default TodoForm;
