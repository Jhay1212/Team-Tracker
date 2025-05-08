import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Routes/Home.jsx';
import Employee from './Routes/Employee.jsx';
import Dashboard from './Routes/Dashboard.jsx';
import Login from './Routes/Login.jsx';
import Register from './Routes/Register.jsx';
const router = createBrowserRouter([
 {
  path: "/",
  element: <Home />,
  errorElement: <h1>404</h1>
 },
 {
  path: "/dashboard",
  element: <Dashboard />,
 },
 {
  path: "/login",
  element: <Login />,
 },
 {
  path: '/signup',
  element: <Register/>  
 },
 {
  path: '/employee/:id',
  element: <Employee/>
 }
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
