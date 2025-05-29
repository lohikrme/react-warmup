import { useState } from 'react';
import './App.css';

const forestGreen = "#228b22"
const oceanBlue = "#4F42B5"


function App(props) {
  const [color, setColor] = useState(oceanBlue)

  const changeColor = () => {
    setColor(prevColor => prevColor === forestGreen ? oceanBlue : forestGreen)
  }

  return (
    <div>
      <p style={{color: color, fontSize: "50px"}}>Hello World!</p>
      <button onClick={changeColor}>Change Color</button>
      <p>{props.story}</p>
    </div>
  )
}


export default App;