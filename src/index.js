import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import SearchBar from "./components/SearchBar";
import data from "./data";

export const ThemeContext = React.createContext();

function useTodos() {
  const [todos, setTodos] = useState(data);

  return {
    todos,
    addTodo: todo => setTodos([...todos, todo]),
    updateTodo: (newTodo, idx) =>
      setTodos(
        todos.map((todo, i) => (idx === i ? newTodo : todo))
      ),
    deleteTodo: idx =>
      setTodos(todos.filter((_, i) => i !== idx))
  };
}

function App() {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo
  } = useTodos();

  const [filter, setFilter] = useState("");

  const filterTodos = useCallback(
    (todos, filter) => {
      if (filter === "") return todos;
      return todos.filter(todo =>
        todo.toLowerCase().includes(filter.toLowerCase())
      );
    },
    [todos, filter]
  );

  const filteredTodos = filterTodos(todos, filter);

  return (
    <ThemeContext.Provider value="palevioletred">
      <div className="App">
        <h1 style={{ color: "palevioletred" }}>
          Todo List
        </h1>
        <TodoForm
          submitHandler={addTodo}
          placeholder="Add new todo"
        />
        <br />
        <SearchBar value={filter} onChange={setFilter} />
        <Todos
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </ThemeContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
