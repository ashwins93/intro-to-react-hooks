import React, { useState, useContext } from "react";

import TodoForm from "./TodoForm";
import { ThemeContext } from "../index";

function useToggler() {
  const [status, setStatus] = useState(false);

  return {
    status,
    toggle: () => setStatus(!status)
  };
}

const Todo = ({ todo, deleteTodo, updateTodo, i }) => {
  const { status, toggle } = useToggler();
  const color = useContext(ThemeContext);

  return !status ? (
    <p style={{ color }} onClick={toggle}>
      {todo}{" "}
      <span onClick={() => deleteTodo(i)}>&times;</span>
    </p>
  ) : (
    <TodoForm
      submitHandler={todo => {
        updateTodo(todo, i);
        toggle();
      }}
    />
  );
};

const Todos = ({ todos = [], ...otherProps }) => {
  return (
    <div>
      {todos.map((todo, i) => (
        <Todo todo={todo} i={i} {...otherProps} />
      ))}
    </div>
  );
};

export default Todos;
