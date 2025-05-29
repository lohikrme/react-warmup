import { useState } from 'react'
import './App.css'

function App() {
  const [numbers, setNumbers] = useState({number1: 0, number2: 0, count: 0})

  const inputChange = (event) => {
    const {name, value} = event.target
    const parsed = parseFloat(value)
    if (isNaN(parsed)) {return}
    setNumbers(prev => ({ ...prev, [name]: parsed }))
  }

  const addition = () => {
    let sum = numbers.number1 + numbers.number2
    setNumbers({...numbers, count: sum})
  }

  const substraction = () => {
    let diff = numbers.number1 - numbers.number2
    setNumbers({...numbers, count: diff})
  }
 
  return (
    <>
      <p>Result: {numbers.count}</p>
      <input name="number1" placeholder="0" onChange={inputChange}></input>
      <input name="number2" placeholder="0" onChange={inputChange}></input>
      <button onClick={addition}>+</button>
      <button onClick={substraction}>-</button>
    </>
  )
}

export default App
