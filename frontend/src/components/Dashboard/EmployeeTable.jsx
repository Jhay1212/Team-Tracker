import {useState, useEffect } from 'react'
import axios from 'axios'
const EmployeeTable = () => {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees/')
        setEmployees(res.data.results)
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
      fetchEmployees();
    }
  }, [employees])
  return (
    <div className="sm:full w-1/2 sm:mx-0 mx-auto">
        
    </div>
  )
}

export default EmployeeTable