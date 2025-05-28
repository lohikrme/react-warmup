import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App story="Once upon a time there lived a dragon in a dark cave, nearby sharp black mountains called..."/>
  </StrictMode>,
)
