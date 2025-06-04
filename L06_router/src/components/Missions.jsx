import { useState } from 'react'
import './styles/Missions.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const startData = [
    {description: "Kill Yoda", status: "pending"}, 
    {description: "Build a deathstar", status: "pending"},
    {description: "Turn to the dark side", status: "completed"}]


function Missions() {
  const [tasks, setTasks] = useState(startData)
  const [newTask, setNewTask] = useState()
  const [newStatus, setNewStatus] = useState()

  const [colDefs, setColDefs] = useState([
    {headerCheckboxSelection: true, checkboxSelection: true, width: 50},
    {field: "description", minWidth: 400},
    {field: "status", filter: true}
  ])



  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {description: newTask, status: newStatus}])
      setNewTask('')
      setNewStatus('')
    }
  };

  const handleDeleteSelected = () => {
    console.log("attempt to delete")
    /*
    const selectedNodes = gridRef.current.api.getSelectedNodes()
    console.log(selectedNodes)
    return
    */
  }

  const handleTaskChange = (event) => {
    setNewTask(event.target.value)
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value)
  };


  return (
    <div className='missions-container'>
      
      <main>
        <div className='title-wrap'><h1>Todo list:</h1></div>
        <div className='todo-wrapper'>
          <input
            type="text"
            value={newTask}
            onChange={handleTaskChange}
            placeholder="New Mission"
          />
          <select onChange={handleStatusChange}>
            <option value="pending">Status: Pending</option>
            <option value="in-progress">Status: In-Progress</option>
            <option value="completed">Status: Completed</option>
          </select>
            <button id="add_button" onClick={handleAddTask}>Add</button>
            <button id="delete_button" onClick={handleDeleteSelected}>Delete Selected</button>

        </div>
      </main>
      <div id="ag_grid" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={tasks}
          columnDefs={colDefs}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
}

export default Missions
