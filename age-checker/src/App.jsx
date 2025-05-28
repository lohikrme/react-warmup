import { useState } from 'react'
import './App.css'

function App() {
  const [person, setPerson] = useState({name: "", age: 0})

  const checkAge = () => {
    if (person.age >= 18) {
      return alert(`Hello, ${person.name}`)
    }
    return alert ("You are too young!")
  }

  const updateName = () => {
    setPerson({...person, [event.target.name]: event.target.value})
  }

  const updateAge = () => {
    if (isNaN(event.target.value)) {
      return
    }
    if (event.target.value < 0 || event.target.value > 150) {
      event.target.value = person.age
      return
    }
    setPerson({...person, [event.target.name]: event.target.value})
  }

  return (
    <>
      <p>Name: {person.name} Age: {person.age}</p>
      <input name="name" placeholder="John" onChange={updateName}></input>
      <input name="age" placeholder="31" onChange={updateAge}></input>
      <button onClick={checkAge}>Check Age</button>
    </>
  )
}

export default App
