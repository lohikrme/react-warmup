import { useState } from 'react'
import './App.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ColDef } from 'ag-grid-community'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Book } from './types/Book'
import { IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'
import { useEffect } from 'react'

import AddBook from './components/AddBook'

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

function App() {
    // define a state called books that stores information of all books
    const [books, setBooks] = useState<Book[]>([])

    // define columns to be displayed inside Ag Grid
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: 'title', width: 150, filter: true },
        { field: 'author', width: 150, filter: true },
        { field: 'year', width: 100, filter: true },
        { field: 'isbn', width: 150, filter: true },
        { field: 'price', width: 100, filter: true },
        {
            field: '',
            width: 80,
            cellRenderer: (params: any) => {
                return (
                    <IconButton onClick={() => deleteBook(params.data.isbn)}>
                        <DeleteForever style={{ color: 'red' }} />
                    </IconButton>
                )
            },
        },
    ])

    // search information of books from database at the initial launch of the website
    useEffect(() => {
        fetchBooks()
    }, [])

    // fetch current information of books from database, and update the books state with it
    const fetchBooks = (): void => {
        console.log('fetchBooks() starts!')
        fetch(
            'https://bookstore-ab22b-default-rtdb.europe-west1.firebasedatabase.app/books/.json'
        )
            .then((response) => response.json())
            .then((data: Record<string, Book>) => {
                if (data && typeof data === 'object') {
                    let bookdata: Book[] = Object.entries(data).map(
                        ([id, value]) => {
                            //console.log(`id: ${id}`)
                            //console.log(value)
                            return { ...value, id: id }
                        }
                    )
                    setBooks(bookdata)
                    //console.log(bookdata)
                } else {
                    console.warn('Data is not an object:', data)
                }
            })
            .catch((error) => alert(error.message))
    }

    // deleting book requires to use the knowledge of its isbn code
    // use locally saved array of all books, and use it to find ids that need to be deleted from db
    const deleteBook = async (isbn: string) => {
        let removable_book_ids: String[] = []
        let all_books: Book[] = []
        await fetch(
            'https://bookstore-ab22b-default-rtdb.europe-west1.firebasedatabase.app/books/.json'
        )
            .then((response) => response.json())
            .then((data: Record<string, Book>) => {
                if (data && typeof data === 'object') {
                    let bookdata: Book[] = Object.entries(data).map(
                        ([id, value]) => {
                            //console.log(`id: ${id}`)
                            //console.log(value)
                            return { ...value, id: id }
                        }
                    )
                    all_books = bookdata
                    //console.log(bookdata)
                } else {
                    console.warn('Data is not an object:', data)
                }
            })
            .catch((error) => alert(error.message))
        console.log(all_books)

        for (let i = 0; i < all_books.length; i++) {
            if (all_books[i].isbn === isbn) {
                removable_book_ids.push(all_books[i].id)
            }
        }

        console.log(removable_book_ids)

        for (let i = 0; i < removable_book_ids.length; i++) {
            //TODO: make delete fetch for each id inside removable_book_ids array and wait between
            try {
                let response = await fetch(
                    `https://bookstore-ab22b-default-rtdb.europe-west1.firebasedatabase.app/books/${removable_book_ids[i]}.json`,
                    {
                        method: 'DELETE',
                    }
                )
                if (!response.ok) {
                    console.error(
                        `Failed to delete book with id ${removable_book_ids[i]}`
                    )
                } else {
                    console.log(`Deleted book with id ${removable_book_ids[i]}`)
                }
            } catch (error) {
                console.error(
                    `Error deleting book with id ${removable_book_ids[i]}:`,
                    error
                )
            }
        }
        fetchBooks()
    }

    // return the website content + notice the AddBook component
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        Books
                    </Typography>
                </Toolbar>
            </AppBar>
            {<AddBook fetchBooks={fetchBooks} />}
            <div
                className="ag-theme-alpine"
                style={{ height: 300, width: 750 }}
            >
                <AgGridReact rowData={books} columnDefs={colDefs} />
            </div>
        </>
    )
}

export default App
