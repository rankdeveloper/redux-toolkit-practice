import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./todo/todoSlice";
import type { RootState } from "./store";
import { motion, AnimatePresence } from "framer-motion";

export default function Todo() {
  const [input, setInput] = React.useState<string>("");
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [editTodoId, setEditTodoId] = React.useState<string | null>(null);

  const dispatch = useDispatch();

  const addTodoHandler = () => {
    if (input.trim() === "") return;

    if (editTodoId !== null) {
      dispatch(editTodo({ editId: editTodoId, name: input }));
      setEditTodoId(null);
    } else {
      dispatch(addTodo(input));
    }

    setInput("");
  };

  const editTodoHandler = (id: string) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    if (todoEdit) {
      setInput(todoEdit.name);
      setEditTodoId(todoEdit.id);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  h-screen  ">
        <div className="flex gap-2 my-8 min-w-[25rem] ">
          <input
            type="text"
            placeholder="Enter some text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border  border-black p-3 w-full"
          />
          <button
            className="text-white py-1 px-2  cursor-pointer bg-gray-900"
            onClick={addTodoHandler}
          >
            {editTodoId ? "Update" : "Add"}
          </button>
        </div>

        <div>
          <AnimatePresence>
            {todos.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex min-w-[25rem]  py-1 px-3 justify-between border border-black mb-2"
                key={i}
              >
                {item.name}{" "}
                <div className="flex gap-2">
                  <button
                    onClick={() => editTodoHandler(item.id)}
                    className="text-white cursor-pointer bg-blue-500 p-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(item.id))}
                    className="text-white cursor-pointer bg-red-500 p-1"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
