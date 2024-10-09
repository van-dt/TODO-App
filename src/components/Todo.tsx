"use client";

import { Protect, useAuth } from "@clerk/nextjs";
import { useState } from "react";

const data = [
  {
    id: 1,
    title: "Hoc",
    completed: true,
  },
  {
    id: 2,
    title: "An",
    completed: true,
  },
  {
    id: 3,
    title: "Ngu",
    completed: true,
  },
];

const Todo = () => {
  const { userId, orgId, has } = useAuth();
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState(data);

  const addTodo = () => {
    const id = todos.length + 1;
    const newData = [
      ...todos,
      {
        id,
        title: todoName,
        completed: true,
      },
    ];

    setTodos(newData);
    setTodoName("");
  };

  const deleteTodo = (index: number) => {
    todos.splice(index, 1);
    const newData = [...todos];

    setTodos(newData);
  };

  const handleAdd = () => {
    if (orgId && userId && has({ permission: "org:todo:create" })) {
      addTodo();
    }
    alert("forbidden");
  };

  const handleDelete = (index: number) => {
    if (orgId && userId && has({ permission: "org:todo:delete" })) {
      deleteTodo(index);
    }
    alert("forbidden");
  };

  return (
    <div>
      <Protect permission="org:todo:create">
        <input
          type="text"
          className="p-2 text-black mr-2"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button
          className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={handleAdd}
        >
          Add
        </button>
      </Protect>
      <div className="bg-neutral-500 mt-3">
        <div>
          {todos.map((todo, index) => (
            <div key={todo.id} className="p-2 border-t flex justify-between">
              <h2>{todo.title}</h2>
              <Protect permission="org:todo:delete">
                <button
                  className="ml-2 middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </Protect>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
