import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A route component that displays an employee's profile.
 *
 * This component fetches the employee's data from the server
 * when the component mounts. It displays a loading message
 * until the data is fetched. If the data is fetched successfully,
 * it displays the employee's name, email, position, team, and phone.
 * If the data is not found, it displays a "No employee found" message.
 * If there is an error fetching the data, it displays an error message.
 *

/*******  96be951b-2f4f-418d-adc5-7aee8e3c8f6c  *******/const Employee = () => {
  const [employee, setEmployee] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/employees/${id}/`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      }).catch((err) => {
        console.log('Error fetching employee:', err);
        setError(err);
        setLoading(false);
      })
  }, [id])


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!employee) return <div>No employee found</div>
  return (
    <div className='w-1/2 mx-auto mt-10 sm:mt-5'>
      <div className="w-full h-1/3 bg-white flex flex-col justify-even items-center rounded-lg">
      <div className="card rounded mx-auto">

      <div className="card-title w-full mb-4 p-5 border-b-neutral-400"><h1 className='font-extrabold border-b pb-4 '>{employee.name}</h1></div>

      <p className="text-mono my-2 text-neutral-500">Email: {employee.email}</p>
      <p className="text-mono my-2 text-neutral-500">Position: {employee.position}</p>
      <p className="text-mono my-2 text-neutral-500">Team: {employee.team}</p>
      <p className="text-mono my-2 text-neutral-500">Phone: {employee.phone}</p>
      </div>
      

      <div id="work-done"></div>

      </div>

    </div>
  )
}

export default Employee