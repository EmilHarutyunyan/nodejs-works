import { useEffect, useState } from "react";

function TodoForm({ onAdd, onEditSave, editTodo,onCancelEdit }) {
  const [text, setText] = useState( "");
  
  useEffect(()=> {
    if(editTodo.text) {
      setText(editTodo.text)
    } else {
      setText("")
    }
  },[editTodo])
 
  return (
    <>
      {editTodo?.text ? (
        <form
          action="#"
          onSubmit={(e) => {
            if (text !== "") {
              e.preventDefault();
              onEditSave({...editTodo,text});
              setText("");
            } else {
              alert("The input data is empty");
            }
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(evt) => {
              setText(evt.target.value);
            }}
          />
          <button type="submit">Edit Save</button>
          <button type="button" onClick={() => onCancelEdit()}>
            Cancel
          </button>
        </form>
      ) : (
        <form
          action="#"
          onSubmit={(e) => {
            if (text !== "") {
              e.preventDefault();
              onAdd(text);
              setText("");
            } else {
              alert("The input data is empty");
            }
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(evt) => {
              setText(evt.target.value);
            }}
          />
          <button>Add</button>
        </form>
      )}
    </>
  );
}

export default TodoForm;
