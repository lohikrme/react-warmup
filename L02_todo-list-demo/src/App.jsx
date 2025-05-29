import { useState } from 'react';
import './App.css';
import TodoTable from './todotable';

function App() {
  const [todo, setTodo] = useState({description: '', date: ''});
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description: '', date: ''}); // Clear todo
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((_, index) => index !== row))
  }

  return (
    <>
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </>
  )
}

export default App;