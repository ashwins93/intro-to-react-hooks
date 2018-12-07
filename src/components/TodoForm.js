import React, { useState } from "react";

const TodoForm = ({ submitHandler, placeholder }) => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitHandler(input);
        setInput("");
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={({ target: { value } }) => setInput(value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default TodoForm;
