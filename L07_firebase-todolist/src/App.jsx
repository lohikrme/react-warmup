import { useState, useEffect } from 'react';
import './App.css';

import AddTodo from './components/AddTodo';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
    const [todos, setTodos] = useState([]);

    const columnDefs = [
        {
            field: 'id',
            filter: true,
            width: 300,
        },
        {
            field: 'description',
            sortable: true,
            filter: true,
        },
        {
            field: 'date',
            sortable: true,
            filter: true,
            valueFormatter: (params) => dateFormatter(params.value),
        },
        {
            field: 'priority',
            sortable: true,
            filter: true,
        },
        {
            field: '',
            width: 100,
            cellRenderer: (params) => {
                return (
                    <IconButton
                        onClick={() => deleteTodo(params.data.id)}
                        size="small"
                        color="error"
                    >
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                );
            },
        },
    ];

    useEffect(() => {
        console.log('useEffect activated');
        fetchItems();
    }, []);

    // id is name of data row such as "-OSJ7IhKlf0kPADYzsLb" generated by Firebase automatically
    const deleteTodo = (id) => {
        console.log('deleteTodo activated');
        console.log(id);
        fetch(
            `https://todolist-88362-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
            {
                method: 'DELETE',
            }
        )
            .then((response) => {
                console.log('fetch has been sent and its response is: ');
                console.log(response);
                fetchItems();
            })
            .catch((err) => console.error(err));
    };

    const fetchItems = () => {
        console.log('fetchItems activated');
        fetch(
            'https://todolist-88362-default-rtdb.europe-west1.firebasedatabase.app/items/.json'
        )
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetch Items function starts!');
                let parsedData = Object.entries(data).map(([id, value]) => {
                    return {
                        id: id,
                        date: value.date || null,
                        description: value.description || '',
                        priority: value.priority || 'Low',
                    };
                });

                console.log(parsedData);
                setTodos(parsedData);
                console.log('Fetch Item function ends!');
            })
            .catch((err) => console.error(err));
    };

    const dateFormatter = (dateString) => {
        let [year, month, day] = dateString.split('-');
        let formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">TodoList</Typography>
                </Toolbar>
            </AppBar>
            <AddTodo fetchItems={fetchItems} />
            <div
                className="ag-theme-material"
                style={{
                    height: 400,
                    width: 1000,
                }}
            >
                <AgGridReact rowData={todos} columnDefs={columnDefs} />
            </div>
        </>
    );
}

export default App;
