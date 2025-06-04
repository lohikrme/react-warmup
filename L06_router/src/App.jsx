import './App.css'
import { BrowserRouter, // used to wrap Routes and Links together
         Routes, // used to wrap Route components
         Route, // renders defined component if location matches
         Link // used for linking to other pages in the website
 } from 'react-router-dom';
import Home from './components/Home'
import NotFound from './components/NotFound'
import Missions from './components/Missions'



function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <nav className='navigation'>
            <Link className='navlink' to="">Home</Link>{' '}
            <Link className='navlink' to="/missions">Missions</Link>{' '}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/missions" element={<Missions/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
