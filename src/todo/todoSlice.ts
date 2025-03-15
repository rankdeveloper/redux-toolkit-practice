import { createSlice, nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
// if (editTodoId !== null) {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === editTodoId ? { ...todo, text: input } : todo
//     );
type todosProps = {
  id: string;
  name: string;
};
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [] as todosProps[],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: nanoid(), name: action.payload });
    },
    // editTodo: (state, action) => {
    //   state.todos = state.todos.map((item) =>
    //     item.id == action.payload.editId
    //       ? { ...item, name: action.payload.name }
    //       : item
    //   );
    // },
    editTodo: (
      state,
      action: PayloadAction<{ editId: string; name: string }>
    ) => {
      const todo = state.todos.find(
        (item) => item.id === action.payload.editId
      );
      if (todo) {
        todo.name = action.payload.name; // ✅ More efficient update
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
