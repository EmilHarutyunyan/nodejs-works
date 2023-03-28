import { useEffect, useState } from "react";
import TodoFooter from "./components/Todo/TodoFooter";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";


function App() {
  const [todos, setTodos] = useState(null);
  const [editTodo, setEditTodo] = useState({})

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

  const handleEdit = async (todo) => {
   const res =  await fetch("http://localhost:3001/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await res.json()
    console.log('data :', data);
    setTodos(data)
    setEditTodo({})
  }
  const handleDelete = async (todo) => {
    const res = await fetch("http://localhost:3001/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    console.log("data :", data);
    setTodos(data);
    setEditTodo({});
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
          onEditSave={(todo) => {
          
            handleEdit(todo);
          }}
          onCancelEdit={() => setEditTodo({})}
          editTodo={editTodo}
        />
        <TodoList
          todos={todos && todos}
          onDelete={(todo) => {
            handleDelete(todo);
          }}
          onChange={(newTodo) => {
            handleEdit(newTodo)
          }}
          onEdit={(todo) => {
            setEditTodo(todo);
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

