import React from "react";
import { Record, Fields } from "../types";
import { useTodosContext } from "../contexts/TodosContext";

interface Props {
  todo: Record;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodosContext();

  const toggleCompleted = () => {
    const updatedFields: Fields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo: Record = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  return (
    <li className="bg-white flex item-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={todo.fields.completed}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={toggleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          todo.fields.completed ? "line-through" : ""
        }`}
      >
        {todo.fields.description}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};
export default Todo;
