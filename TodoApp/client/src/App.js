import { useEffect, useState } from "react";
import TodoFooter from "./components/Todo/TodoFooter";
import TodoForm from "./components/Todo/TodoForm";
import TodoLIst from "./components/Todo/TodoList";


function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let subscribed = true;
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/todos`);
      const data = await res.json();
      if (subscribed) {
        setTodos(data);
      }
    };
    fetchData().catch(console.error);
    return () => (subscribed = false);
  }, []);

  useEffect(() => {
    handleSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const handleSubmit = async () => {
    await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos),
    });
  };

  if (!todos) {
    return (
      <div id="app">
        <main>
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }
  return (
      <main>
        <>
          <TodoForm
            onAdd={(text) => {
              setTodos([
                ...todos,
                {
                  id: Math.random(),
                  text: text,
                  isCompleted: false,
                },
              ]);
            }}
          />
          <TodoLIst
            todos={todos && todos}
            onDelete={(todo) => {
              setTodos(todos.filter((t) => t.id !== todo.id));
            }}
            onChange={(newTodo) => {
              setTodos(
                todos.map((todo) => {
                  if (todo.id === newTodo.id) {
                    return newTodo;
                  }
                  return todo;
                })
              );
            }}
          />
          <TodoFooter
            todos={todos && todos}
            onClearcompleted={() => {
              setTodos(todos.filter((todo) => !todo.isCompleted));
            }}
          />
        </>
      </main>
  );
}

export default App;

