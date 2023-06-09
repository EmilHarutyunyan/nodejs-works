import TodoItem from "./TodoItem";

function TodoLIst({ todos, onChange, onDelete,onEdit }) {
  return (
    <div>
      {todos?.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}

export default TodoLIst;
