import './App.css'
import { useState } from 'react'

function App() {
  const [person, setPerson] = useState({firstname: "Matti", lastname: "Welin", email: `mattiwelin@lab.fi`})

  const inputChanged = (event) => {
    setPerson({...person, [event.target.name]: event.target.value})
  }

  const submitForm = () => {
    event.preventDefault()
    alert(`Person information updated successfully!`)
  }

  return (
    <>
    <p>Name: {person.firstname} {person.lastname}</p>
    <p>Email: {person.email}</p>  
    <br></br>

    <form onSubmit={submitForm}>
    <p>Please write your new information here:</p>
    <p>FirstName:</p><input placeholder="First name" name="firstname" value={person.firstname} onChange={inputChanged} /><br></br>
    <p>LastName:</p><input placeholder="Last name" name="lastname" value={person.lastname} onChange={inputChanged} /><br></br>
    <p>Email:</p><input placeholder="Email" name="email" value={person.email} onChange={inputChanged} /> <br></br>
    <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default App
