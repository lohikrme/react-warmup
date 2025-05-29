import { useState } from 'react'
import './App.css'

function App() {
  const [person, setPerson] = useState({
    fname: "", lname: "", email: "", phone: ""})

  const sendPersonalInfo = (event) => {
    event.preventDefault()

    if (!person.fname || !person.lname || !person.email || !person.phone) {
      alert ("Please fill all fields before submitting!")
      return
    }
    alert(
      `Your new contact information is:\n` +
      `First Name: ${person.fname}\n` +
      `Last Name: ${person.lname}\n` +
      `Email: ${person.email}\n` +
      `Phone: ${person.phone}`
    )
  }

  const updatePersonalInfo = (event) => {
    const {name, value} = event.target
    setPerson(prev => ({ ...prev, [name]: value}))
  }

  return (
    <>
      <form>
        <input type="text" name="fname" placeholder="First Name" onChange={updatePersonalInfo}></input><br></br>
        <input type="text" name="lname" placeholder="Last Name" onChange={updatePersonalInfo}></input><br></br>
        <input type="email" name="email" placeholder="Email" onChange={updatePersonalInfo}></input><br></br>
        <input type="tel" name="phone" placeholder="Phone" onChange={updatePersonalInfo}></input><br></br>
        <button onClick={sendPersonalInfo}>Submit</button>
      </form>
    </>
  )
}

export default App
