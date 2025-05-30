import { useState } from 'react'
import './App.css'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

function App() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" }
  ]);

  return (
    <>
      <div style={{ height: 500, width: 500, backgroundColor: "lightgreen" }}>
          <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
          />
      </div>
    </>
  )
}

export default App
