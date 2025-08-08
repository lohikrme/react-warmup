import { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { Book } from '../types/Book'

// addBook
function AddBook({ fetchBooks }: { fetchBooks: () => void }) {
    const [open, setOpen] = useState(false)
    const [book, setBook] = useState<Book>({
        id: '',
        author: '',
        isbn: '',
        price: '',
        title: '',
        year: '',
    })

    // when Add Book button is clicked, it updates the state to open the form
    const handleOpen = () => {
        console.log('Open the form to add new Book')
        setOpen(true)
    }

    // when Cancel button is clicked, it updates the state to close the form
    const handleClose = () => {
        console.log('Close the form without saving')
        setOpen(false)
    }

    // when Save button is clicked, it sends first new book into database, and then closes the form
    const handleSave = () => {
        console.log('Close the form and save into database')
        addBook(book)
        handleClose()
    }

    // adding new books into database is done by receiving new Book from book state
    // and then stringify that to a suitable json form and send to database
    const addBook = (newBook: Book) => {
        fetch(
            'https://bookstore-ab22b-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
            {
                method: 'POST',
                body: JSON.stringify(newBook),
            }
        )
            .then((response) => fetchBooks())
            .catch((err) => console.error(err))
    }

    // inputChanged keeps log of current state of a single new book to be added
    // for learning purposes prints any change done to the new book
    const inputChanged: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        if (!event) {
            return
        }
        console.log(event.target.value)
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        })
    }

    // the main thing is to return the form to add new button and needed buttons
    // but here is also the 'Add Book' button that is always visible on the App.tsx file
    return (
        <>
            <h2>Add a new Book</h2>
            <Button variant="outlined" onClick={handleOpen}>
                Add Book
            </Button>
            <Dialog open={open}>
                <DialogTitle>New book</DialogTitle>
                <DialogContent>
                    <TextField
                        name="title"
                        value={book.title}
                        onChange={inputChanged}
                        margin="dense"
                        label="Title"
                        fullWidth
                    />
                    <TextField
                        name="author"
                        value={book.author}
                        onChange={inputChanged}
                        margin="dense"
                        label="Author"
                        fullWidth
                    />
                    <TextField
                        name="year"
                        value={book.year}
                        onChange={inputChanged}
                        margin="dense"
                        label="Year"
                        fullWidth
                    />
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        onChange={inputChanged}
                        margin="dense"
                        label="ISBN"
                        fullWidth
                    />
                    <TextField
                        name="price"
                        value={book.price}
                        onChange={inputChanged}
                        margin="dense"
                        label="Price"
                        fullWidth
                    />
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
    )
}

export default AddBook
