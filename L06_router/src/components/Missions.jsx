import { useState } from 'react'
import './styles/Missions.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useMemo } from 'react';
import { useRef } from 'react';




// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


const startData = [
    {description: "Kill Yoda", status: "pending"}, 
    {description: "Build a deathstar", status: "pending"},
    {description: "Turn to the dark side", status: "completed"}]


function Missions() {
  const [tasks, setTasks] = useState(startData)
  const [newTask, setNewTask] = useState()
  const [newStatus, setNewStatus] = useState("pending")
  const gridRef = useRef();

  const [colDefs, setColDefs] = useState([
    {field: "description", minWidth: 400},
    {field: "status", filter: true}
  ])

  const rowSelection = useMemo(() => { 
    return {
          mode: 'multiRow',
          checkboxes: (params) => {
          console.log({params})
          return true
          },
      };
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {description: newTask, status: newStatus}])
      setNewTask('')
      setNewStatus("pending")
    }
  };

  const handleDeleteSelected = () => {
    console.log("attempt to delete")
    let selectedNodes = gridRef.current?.api.getSelectedRows()
    let selectedDescriptions = selectedNodes.map(node => node.description)
    console.log(selectedDescriptions)
    let updatedTasks = tasks.filter((task) => !selectedDescriptions.includes(task.description))
    console.log(tasks)
    console.log(updatedTasks)
    setTasks(updatedTasks)
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
          ref={gridRef}
          rowData={tasks}
          columnDefs={colDefs}
          rowSelection={rowSelection}
          onSelectionChanged={(event) => {
                if (event.selectedNodes.length > 0) {
                      event.selectedNodes.map(node => console.log(node.data)) }
                else console.log("no selectedNodes")
          }}
        />
      </div>
    </div>
  );
}

export default Missions
