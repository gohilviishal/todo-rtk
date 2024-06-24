interface Todo {
  id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
}
export { Todo, TodoState };
