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

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Not Completer'

        }
        return new Date(dateString).toLocaleDateString();
    }

    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Project List</h1>
    
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase text-left">
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created At</th>
                  <th className="py-3 px-4">Updated At</th>
                  <th className="py-3 px-4">Date Completed</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {data.length > 0 ? (
                data.map((project) => (
                    <tr
                      key={project.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4">{project.employee?.name}</td>
                      <td className="py-3 px-4">{project.description}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            project.status === "Completed"
                              ? "text-green-600"
                              : project.status === "In Progress"
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatDate(project.created_at)}</td>
                      <td className="py-3 px-4">{formatDate(project.updated_at)}</td>
                      <td className="py-3 px-4">
                        {formatDate(project.task_date_completed)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No projects available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    
}

export default TableData