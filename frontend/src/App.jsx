import React from 'react'
import ReactDom from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home'
import Dashboard from './Routes/Dashboard';


const App = () => {
  return (
    

    <div className='min-h-full bg-black min-w-100'>
      <Router>
        <Routes>
        <Route path='/' element={<Home />} />
        
        </Routes>
        <Routes>
          
        </Routes>
        </Router>

        </div>
      
  

  
  )
}

export default App