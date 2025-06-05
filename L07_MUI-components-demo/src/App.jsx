import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid} from '@mui/x-data-grid';


const rows = [
  { id: 1, name: 'Data Grid', description: 'the Community version' },
  { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
  { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
];

const columns = [
  { field: 'name', headerName: 'Product Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
];

function App() {
  const [todo, setTodo] = useState({ id:"", description: '', date: '' });
  const [todos, setTodos] = useState([]);
  const [idNumber, setIdNumber] = useState(0)


  const convertDateFormat = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
  };


  const defColumns = [
    { field: "description", headerName: "Description", width: 300 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete" placement="right" arrow>
          <IconButton size="small" color="error" onClick={() => deleteTodo(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

    

  const inputChanged = (event) => {
      console.log(todo)
      setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = () => {
      console.log(idNumber)
      setTodo({...todo, id: idNumber})
      setTodos([...todos, todo]);
      setIdNumber(idNumber + 1)
  }

  const deleteTodo = (id_num) => {
      console.log("attempt to delete!")
      console.log(id_num)
      setTodos(todos.filter((todo) => todo.id !== id_num));
  };


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        className='stack'
        direction="row"
        spacing={5}
        mt={0}
        justifyContent="center"
        alignItems="left">
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={todo.description}
          onChange={inputChanged} />
        <TextField
          variant="standard"
          type='date'
          name="date"
          value={todo.date}
          onChange={inputChanged} />
          <Tooltip title="add a todo to list" placement="right" arrow>
              <Button variant="outlined" size="small" startIcon={<SaveIcon/>} onClick={addTodo}>
                      Add
              </Button>
        </Tooltip>
      </Stack>
      <table className='table'>
          <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
              </tr>
          </thead>
          <tbody>
              {
                todos.map((todo) =>
                  <tr key={todo.id}>
                    <td>{todo.description}</td>
                    <td>{convertDateFormat(todo.date)}</td>
                    <td>
                      <Tooltip title="delete" placement="right" arrow>
                        <IconButton size="small" color="error" onClick={() => deleteTodo(todo.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>)
              }
          </tbody>
      </table>
      <div style={{ height: 300, width: '100%' }}>
          <DataGrid 
            className='datagrid' 
            columns={defColumns} 
            rows={todos.map((todo) => {
              return ({...todo, date: convertDateFormat(todo.date)})
            })}
          />
      </div>
    </>
  );
}

export default App;