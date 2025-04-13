import React from 'react'
import ReactDom from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home'
import Employee from './components/Employee';
import Dashboard from './Routes/Dashboard';


const App = () => {
  return (
    

    <div className='min-h-full bg-black min-w-100'>
      <Router>
        <Routes>
        <Route path='/' element={<Home />} />
        
        </Routes>
        <Routes>
          
        <Route path='/employee' element={<Employee />} />
        </Routes>
        </Router>

        </div>
      
  

  
  )
}

export default App