import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Todo } from "./types";

interface TodoState {
  todos: Todo[];
}

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
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});
