import { useState } from 'react'
import './App.css'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { themeQuartz } from 'ag-grid-community'
import ReactiveButton from 'reactive-button'

function App() {
  const [state, setState] = useState("idle")
  const [todo, setTodo] = useState({description: '', date: '', status: ''})
  const [todos, setTodos] = useState([])

  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule])

  // Column definitions for ag-grid
  const columnDefs = [
    { field: 'description', filter: true, suppressMovable: true},
    { field: 'date', filter: true, suppressMovable: true},
    { field: 'status', filter: true, suppressMovable: true}
  ]

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  const addTodo = () => {
    setState("loading")
    setTimeout(() => {
      setTodos([...todos, todo])
      setTodo({description: '', date: '', status: ''})
      setState("idle")
    }, 2000)
    
  }

  return (
    <>
      <input placeholder="Description" type="text" name="description" value={todo.description} onChange={inputChanged} />
      <input placeholder="Date" type="date" name="date" value={todo.date} onChange={inputChanged}/>
      <input placeholder="Status" type="text" name="status" value={todo.status} onChange={inputChanged}/>
      <ReactiveButton onClick={addTodo} buttonState={state} idleText="Add" 
            loadingText="Loading..." successText="Add" color='#AF9812'></ReactiveButton>
      <div className="ag-theme-quartz" style={{height: 400, width: 600}}>
         <AgGridReact
            rowData={todos}
            columnDefs={columnDefs}
         />
      </div>
    </>
  )
}

export default App