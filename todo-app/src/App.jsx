import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const[input,setInput]=useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const defaultTodos = [
  { text: "Fajar Prayer", completed: false },
  { text: "Recite Quran e Pak", completed: false },
  { text: "A little Nap", completed: false },
  { text: "Breakfast", completed: false },
  { text: "Start Study", completed: false },
  { text: "Lunch at 2 pm", completed: false },
  { text: "A little Nap", completed: false },
  { text: "Shower Time", completed: false },
  { text: "Zuhar & Asar Prayer", completed: false },
  { text: "Start Study Again", completed: false },
  { text: "Maghrib & Isha Prayer", completed: false },
  { text: "Dinner", completed: false },
  { text: "Study a little more", completed: false },
  { text: "Then go to bed for sleep", completed: false }
];

const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : defaultTodos;
});

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const filteredTodos = todos.filter((todo) => {
  if (filter === "completed") return todo.completed;
  if (filter === "pending") return !todo.completed;
  return true; // "all"
});

 function startEdit(index) {
  setEditIndex(index);
  setEditText(todos[index].text);
}

function saveEdit(index) {
  const updatedTodos = todos.map((todo, i) => {
    if (i === index) {
      return { ...todo, text: editText };
    }
    return todo;
  });

  setTodos(updatedTodos);
  setEditIndex(null);
  setEditText("");
}



 function addTodo() {
  if (input.trim() === "") return;

  setTodos([...todos, { text: input.trim(), completed: false }]);
  setInput("");
}

function deleteTodo(indexToDelete) {
  const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
  setTodos(updatedTodos);
}

  function toggleComplete(indexToToggle) {
  const updatedTodos = todos.map((todo, index) => {
    if (index === indexToToggle) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  setTodos(updatedTodos);
}

  return(
<div className="container">
  <h1>To Do List</h1>
  <div className="input-row">
  <input className="items"
   type="text" 
   value={input}
   onChange={(e)=>setInput(e.target.value)}
     onKeyDown={(e) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  }
   }
   placeholder="Add a new task..."
  />
  <button id="adbtn" onClick={addTodo}>Add</button>
  </div>
  <h3>My To Do List</h3>
  <div>
    {filteredTodos.map((todo, index) => (
  <div key={index} className="todo-row">

    {editIndex === index ? (
      <>
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={() => saveEdit(index)}>Save</button>
      </>
    ) : (
      <>
        <p
        className='items'
          onClick={() => toggleComplete(index)}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "pointer"
          }}
        >
          {todo.text}
        </p>

        <button id="edit-btn" onClick={() => startEdit(index)}>Edit</button>
        <button id="dlt-btn" onClick={() => deleteTodo(index)}>Delete</button>
        <div className="filter-buttons">
  <button onClick={() => setFilter("all")}>All</button>
  <button id="cmplt-btn" onClick={() => setFilter("completed")}>Completed</button>
  <button onClick={() => setFilter("pending")}>Pending</button>
</div>
      </>
    )}

  </div>
))}
  </div>

</div>

  );
}

export default App
