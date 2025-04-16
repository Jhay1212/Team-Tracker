import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
const TableData = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/employees/');
                setData(response.data.results);
            } catch (error) {
                console.log('error', error.message);
        }};
        fetchData();
    }, [data]);

    // console.log(`Table data $`);
  return (
    <div classname='container p-2 font-bolder'>
        <table className="table table-striped table-hover table-bordered w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Department</th>
                        <th scope="col">Team</th>
                        <th scope="col">Position</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.department}</td>
                            <td>{item.team}</td>
                            <td>{item.position}</td>
                            <td><button className='btn btn-primary'>Edit</button></td>
                        </tr>
                    ))}
                    </tbody>
                    
            </table>

    </div>
  )
}

export default TableData