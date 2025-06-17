import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// addTodo
function AddTodo({ fetchItems }) {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({
        id: '',
        description: '',
        date: '',
        priority: 'Medium',
    });

    const handleOpen = () => {
        console.log('Open the form to add new todo');
        setOpen(true);
    };

    const handleClose = () => {
        console.log('Close the form without saving');
        setOpen(false);
    };

    const handleSave = () => {
        console.log('Close the form and save into database');
        addTodo(todo);
        handleClose();
    };

    const addTodo = (newTodo) => {
        fetch(
            'https://todolist-88362-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
            {
                method: 'POST',
                body: JSON.stringify(newTodo),
            }
        )
            .then((response) => fetchItems())
            .catch((err) => console.error(err));
    };

    const inputChanged = (event) => {
        console.log(event.target.value);
        setTodo({
            ...todo,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Add todo
            </Button>
            <Dialog open={open}>
                <DialogTitle>New todo</DialogTitle>
                <DialogContent>
                    <TextField
                        name="description"
                        value={todo.description}
                        onChange={inputChanged}
                        margin="dense"
                        label="Description"
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={dayjs(todo.date)}
                            onChange={(newValue) =>
                                inputChanged({
                                    target: {
                                        name: 'date',
                                        value: newValue.format('YYYY-MM-DD'),
                                    },
                                })
                            }
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'dense',
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            name="priority"
                            value={todo.priority}
                            onChange={inputChanged}
                            label="Priority"
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddTodo;
