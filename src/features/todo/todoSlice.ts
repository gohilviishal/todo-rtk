import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Todo, TodoState } from "./types";

const initialState: TodoState = {
  todos: [{ id: "1", text: "Hello world" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo: Todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
